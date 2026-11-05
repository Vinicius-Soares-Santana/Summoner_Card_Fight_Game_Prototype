import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';
import { gainItemQuest } from '../../World/worldActions';

function QuestManager(props) {
    const TemplateAllQuests = {
        questName: {startCondition: true, endCondition: false, initialObjective: 'Buy Potatoes', reward: ''},
    }

    const characterName = props.characterName;
    const allQuests = props.allQuests;
    const eventName = props.eventName;

        
    const questsAvailableNow = useSelector((state) => state.worldState.quests);
    const playerInfo = useSelector((state) => state.playerWorld);
    const dialogInfo = useSelector((state) => state.worldState.worldEvents[eventName]);


    const dispatch = useDispatch();

    useEffect(()=>{
        const questsAvailableNames = Object.keys(questsAvailableNow);

        for (const questName of Object.keys(allQuests)){
            if(!questsAvailableNames.includes(questName)){
                if(allQuests[questName].startCondition){
                    dispatch(worldStateActions.addQuest({questName: questName, currentObjective: allQuests[questName].initialObjective }));
                }
            } else {
                const thisQuest = questsAvailableNow[questName];
                if(allQuests[questName].endCondition && thisQuest.questStatus === 'active'){

                    if(dialogInfo.status == 'idle') dispatch(worldStateActions.changeEventStep({
                                        eventName: eventName,
                                        newStatus: 'continue',
                                        proceedStep: false,
                                    }));

                    if (dialogInfo?.status !== 'dialog') return;
                    dispatch(worldStateActions.changeQuestStatus({questName: questName, newQuestStatus: 'complete' }));
                    if(allQuests[questName].reward != '' && allQuests[questName].reward != null){
                        dispatch(gainItemQuest(allQuests[questName].reward));
                    }
                }
            }
        }
    },[dialogInfo, playerInfo])


    return (
        <div className={`${characterName} QuestManager`}>
        </div>
    );
}

export default QuestManager;
