import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DialogManager from './DialogManager';
import { completeQuest } from './QuestManager';
import { startCampaignBattle } from '../../Battle/battleActions';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';
import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';

function buildScript(dialogue) {
  const linesOrBranches = typeof dialogue === 'string' ? [dialogue] : dialogue;
  const branches = Array.isArray(linesOrBranches) ? { standard: linesOrBranches } : linesOrBranches;
  const script = {};

  for (const [branch, lines] of Object.entries(branches)) {
    const steps = {};
    for (const [index, entry] of lines.entries()) {
      const line = typeof entry === 'string' ? { text: entry } : entry;
      const hasNext = index + 1 < lines.length;
      let status = line.status ?? (hasNext || line.nextBranch ? 'dialog' : 'idle');
      let options = line.options ?? ['Ok'];

      if (line.fight) {
        status = 'fightRequested';
        options = [line.fight];
      } else if (line.turnIn) {
        status = 'turnInRequested';
        options = [line.turnIn];
      }

      steps[index + 1] = {
        ramification: false,
        Ok: {
          message: line.text,
          options,
          status,
          proceedStep: status === 'dialog' || (status === 'idle' && Boolean(line.nextBranch)),
          branch: line.nextBranch,
        },
      };
    }
    script[branch] = steps;
  }

  return script;
}

function processNpcEvent(character) {
  return (dispatch, getState) => {
    const state = getState();
    const { id, name, portrait = '', quest, battle } = character;
    const event = state.worldState.worldEvents[id];
    if (!event || state.battle.status !== 'idle') return false;

    const { status } = event;
    const currentQuest = quest && state.worldState.quests[quest.id];

    function changeStatus(newStatus, newBranch) {
      dispatch(worldStateActions.changeEventStep({
        eventName: id,
        newStatus,
        newBranch,
        proceedStep: Boolean(newBranch),
      }));
    }

    function showMessage(message) {
      changeStatus('idle');
      dispatch(playerWorldActions.changeDialog({
        eventName: id, title: name, image: portrait, message,
        options: ['Ok'], status: 'idle', proceedStep: false,
      }));
    }

    function startQuest() {
      if (!quest || currentQuest) return;
      dispatch(worldStateActions.addQuest({
        questName: quest.id,
        currentObjective: quest.objective,
      }));
    }

    function showEnding() {
      if (quest) dispatch(completeQuest(quest.id, quest.reward));
      const branch = quest?.completedBranch ?? battle?.victoryBranch;
      changeStatus(branch ? 'dialog' : 'complete', branch);
    }

    if (!battle) {
        startQuest();
        if (status === 'turnInRequested' && quest) {
          if (currentQuest?.questStatus === 'complete' || quest.ready?.(state)) {
            showEnding();
          } else {
            showMessage(quest.waitingMessage ?? 'Come back when you are ready.');
          }
        }
        return false;
      }
  
      if (status !== 'fightRequested' && status !== 'waitingResult') return false;
  
      const won = state.playerWorld.EnemiesDefeated.includes(battle.enemyId);
      if (won || currentQuest?.questStatus === 'complete') {
        startQuest();
        showEnding();
        return false;
      }
  
      if (status === 'waitingResult') {
        changeStatus('idle');
        return false;
      }
  
      const result = dispatch(startCampaignBattle(battle.enemyId, battle.difficulty));
      if (!result.ok) {
        showMessage(result.error);
        return false;
      }
  
      startQuest();
      changeStatus('waitingResult');
      return true;
    };
  }
  
  export default function NPC({ character, children }) {
    const { id, name, portrait = '', dialogue, script } = character;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const event = useSelector(state => state.worldState.worldEvents[id]);
    const arenaStatus = useSelector(state => state.battle.status);
  
    useEffect(() => {
      if (!event || arenaStatus !== 'idle') return;
      if (!character.quest && !character.battle) return;
      if (dispatch(processNpcEvent(character))) navigate('/arena');
    }, [event, arenaStatus, character, dispatch, navigate]);
  
    return (
      <div id={id}>
        <DialogManager
          eventName={id}
          characterName={name}
          characterImage={portrait}
          characterScript={script ?? buildScript(dialogue)}
        />
        {children}
      </div>
    );
  }