import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';
import { startCampaignBattle } from '../../../../../Battle/battleActions';
import './FairyBearerGuard.css';

const characterName = 'Guard';
const characterImage = './';
const eventName = 'FairyGuardBattle';


const characterScript = {
    standard: {
        1: {
            ramification: false,
            Ok: {
                message: 'If you came looking for the vizyr, you\'re wating your time.',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'Wait a minute...',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        3: {
            ramification: false,
            Ok: {
                message: 'I know you!',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        4: {
            ramification: false,
            Ok: {
                message: 'You will regret not giving up your life to the king.',
                status: 'battle',
                options: ['Defend yourself'],
                proceedStep: true,
            },
        },
    },
    CONGRATULATIONS: {
        1: {
            ramification: false,
            Ok: {
                message: 'Run while you can, he will go after all of them if he sees you...',
                status: 'complete',
                options: ['I won\'t'],
                proceedStep: true,
            },
        },
    },
};

function FairyBearerGuard() {
    const items = useSelector((state) => state.playerWorld.Items);
    const creatureSelection = useSelector((state) => state.playerWorld.selectedCreatures);
    const creaturesAvailable = useSelector((state) => state.playerWorld.availableCreatures);
    const EnemiesDefeated = useSelector((state) => state.playerWorld.EnemiesDefeated);
    const fairyQuest = useSelector((state) => state.worldState.quests['FairyBattle'] ?? {});
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
        'FairyBattle': {
            startCondition: answers.includes('Defend yourself'),
            endCondition: EnemiesDefeated?.includes('fairyWarden'),
            initialObjective: 'Defeat the Fairy Bearer',
            reward: 'Fairy',
            completedBranch: 'CONGRATULATIONS',
        },
    };

    useEffect(() => {
        const thisEvent = event ?? {};

        if(answers.includes('Defend yourself') && thisEvent.status != 'complete' 
                && !creaturesAvailable.includes('Fairy') && fairyQuest.status != 'complete'
                && ArenaStatus == 'idle' && event?.status != 'battle'){
            const result = dispatch(startCampaignBattle('fairyWarden', 'normal'));
            if (!result.ok) { return; }
            navigate('/arena');
        }
    }, [event, creaturesAvailable, fairyQuest, ArenaStatus])


    return (
        <div id="FairyBearerGuard">
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

export default FairyBearerGuard;