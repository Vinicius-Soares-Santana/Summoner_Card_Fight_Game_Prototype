import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';
import { gainItemQuest } from '../../World/worldActions';


export function completeQuest(questName, reward) {
    return (dispatch, getState) => {
        const quest = getState().worldState.quests[questName];

        if (quest?.questStatus !== 'active') return;

        dispatch(worldStateActions.changeQuestStatus({
            questName,
            newQuestStatus: 'complete',
        }));

        if (reward) dispatch(gainItemQuest(reward));
    };
}

function QuestManager({ eventName, allQuests }) {
    const dispatch = useDispatch();
    const quests = useSelector((state) => state.worldState.quests);
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );

    // const exampleObjectAllQuests = {
    //     TestQuest: {
    //         startCondition,
    //         endCondition,
    //         initialObjective: 'Buy Potatoes',
    //         reward: 'Potion',
    
    //         waitingStep: 'BranchOfTheMessage',
    //         waitingBranch: 'StepWhereNPCWaitsForMissionToBeComplete',               
    //         completedBranch: 'WinningBranch', 
    //     },
    // };

    useEffect(() => {
        if (!event) return;

        for (const questName of Object.keys(allQuests)) {
            const config = allQuests[questName];
            const quest = quests[questName];

            if (!quest) {
                if (config.startCondition) {
                    dispatch(worldStateActions.addQuest({
                        questName,
                        currentObjective: config.initialObjective,
                    }));
                }
                continue;
            }

            const atWaitingLine =
                event.branch === config.waitingBranch &&
                event.eventStep === (config.waitingStep ?? 1);

            if (quest.questStatus === 'complete') {
                if (atWaitingLine && ['idle', 'continue'].includes(event.status)) {
                    dispatch(worldStateActions.changeEventStep({
                        eventName,
                        newStatus: 'idle',
                        newBranch: config.completedBranch,
                        proceedStep: true,
                    }));
                }
                continue;
            }

            if (quest.questStatus !== 'active' || !config.endCondition) continue;
            if (event.status !== 'idle') continue;

            if (event.branch === config.completedBranch) {
                dispatch(completeQuest(questName, config.reward));
            } else if (atWaitingLine) {
                dispatch(worldStateActions.changeEventStep({
                    eventName,
                    newStatus: 'continue',
                    proceedStep: false,
                }));
            }
        }
    }, [allQuests, dispatch, event, eventName, quests]);

    return null;
}

export default QuestManager;