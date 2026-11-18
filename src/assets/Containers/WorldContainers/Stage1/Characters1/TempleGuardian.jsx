import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';
import { startCampaignBattle } from '../../../../../Battle/battleActions';
import { worldStateActions } from '../../../../../store/WorldSlices/WorldStateSlice';
import './TempleGuardian.css';

const characterName = 'Temple Guardian';
const characterImage = './';
const eventName = 'TempleGuardianBattle';


const characterScript = {
    standard: {
        1: {
            ramification: false,
            Ok: {
                message: '...',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'There is no reason for you to be here peasant, retur to where you came from.',
                status: 'dialog',
                options: ['I\'m here to see the king'],
                proceedStep: true,
            },
        },
        3: {
            ramification: false,
            ok: {
                message: 'If you don\'t leave by your own will, you shall be removed.',
                status: 'dialog',
                options: ['I can\'t leave without seeing him.'],
                proceedStep: true,
            },
        },
        4: {
            ramification: false,
            ok: {
                message: 'Then you will face the consequences.',
                status: 'dialog',
                options: ['...'],
                proceedStep: true,
            },
        },
    },
    CONGRATULATIONS: {
        1: {
            ramification: false,
            ok: {
                message: 'I... failed...my...duty...',
                status: 'dialog',
                options: ['...'],
                proceedStep: true,
            },
        },
        2: {
            ramification: true,
            '...': {
                message: '...',
                status: 'complete',
                options: ['Claim SoulEater Rune', 'Claim DragonKing Rune'],
                proceedStep: true,
            },
        },
    },
};

function TempleGuardian() {
    const items = useSelector((state) => state.playerWorld.Items);
    const creatureSelection = useSelector((state) => state.playerWorld.selectedCreatures);
    const creaturesAvailable = useSelector((state) => state.playerWorld.availableCreatures);
    const EnemiesDefeated = useSelector((state) => state.playerWorld.EnemiesDefeated);
    const templeGuardianQuest = useSelector((state) => state.worldState.quests['TempleGuardianBossBattle'] ?? {});
    const currentEventsList = useSelector(
        (state) => state.worldState.worldEvents
    );
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );
    const ArenaStatus = useSelector(
        (state) => state.battle.status
    );


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const answers = Object.values(event?.optionsChosen ?? {});


    const allQuests = {
        'TempleGuardianBossBattle': {
            startCondition: answers.includes('...'),
            endCondition: EnemiesDefeated?.includes('TempleGuardian') && (answers.includes('Claim SoulEater Rune') || answers.includes('Claim DragonKing Rune')),
            initialObjective: 'Defeat the Temple Guardian',
            reward: (answers.includes('Claim SoulEater Rune') ? 'SoulEater' : answers.includes('Claim DragonKing Rune') ? 'DragonKing' : ''),
        },
    };

    useEffect(() => {
        const thisEvent = event ?? {};

        if (
            thisEvent.status === 'waitingResult' &&
            EnemiesDefeated.includes('TempleGuardian')
        ) {
            dispatch(worldStateActions.changeEventStep({
                eventName,
                newStatus: 'dialog',
                newBranch: 'CONGRATULATIONS',
                proceedStep: true,
            }));
            return;
        }

        if(answers.includes('...') && !answers.includes('I won\'t') && thisEvent.status != 'complete' 
                && thisEvent.status != 'waitingResult' 
                && !EnemiesDefeated.includes('TempleGuardian') && templeGuardianQuest.questStatus !== 'complete'
                && ArenaStatus == 'idle'){
            const result = dispatch(startCampaignBattle('TempleGuardian', 'hard'));
            if (!result.ok) { return; }

            dispatch(worldStateActions.changeEventStep({
                eventName,
                newStatus: 'waitingResult',
                proceedStep: false,
              }));

            navigate('/arena');
        }
    }, [event, creaturesAvailable, templeGuardianQuest, ArenaStatus])


    return (
        <div id="TempleGuardian">
            <DialogManager
                characterName={characterName}
                characterImage={characterImage}
                eventName={eventName}
                characterScript={characterScript}
            />
            <QuestManager
                eventName={eventName}
                allQuests={allQuests}
            />
        </div>
    );
}

export default TempleGuardian;