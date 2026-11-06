import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';
import NextSceneButton from '../../../Containers/NextSceneButton';

const characterName = 'MainCharacter';
const characterImage = './';
const eventName = 'EnterTheTemple';

const accepted = {
    message: 'NICE! Can you buy me a potato?',
    status: 'dialog',
    options: [],
    proceedStep: true,
    branch: 'Yes',
};

const refused = {
    message: "I mean, that's not exactly an option, but ok...",
    status: 'idle',
    options: [],
    proceedStep: true,
    branch: 'No',
};

const characterScript = {
    standard: {
        1: {
            ramification: false,
            Ok: {
                message: 'I need at least 4 creatures of the 1st tier and 1 of the 2nd tier to enter the temple...',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'I should start by checking the shop.',
                status: 'idle',
                options: [],
                proceedStep: true,
                branch: 'standard',
            },
        },
    },
    EnterOrNot: {
        1: {
            ramification: false,
            Ok: {
                message: 'I think I can proceed now, I should make sure I\'m ready',
                status: 'dialog',
                options: ['Proceed', 'Stay'],
                proceedStep: true,
            },
        },
        2: {
            ramification: true,
            Proceed: {},
            Stay: refused,
        },
    },
};

function TestCharacter() {
    const navigate = useNavigate();
    const items = useSelector((state) => state.playerWorld.Items);
    const enemiesDefeated = useSelector((state) => state.playerWorld.EnemiesDefeated);
    const creaturesObtained = useSelector((state) => state.playerWorld.selectedCreatures);
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );
    const WorldEvents = useSelector(
        (state) => state.worldState.worldEvents
    );
    const WorldCurrentQuests = useSelector(
        (state) => state.worldState.quests
    );

    const allQuests = {
        EnterTheTemple: {
            startCondition: !Object.keys(WorldCurrentQuests ?? {}).includes('EnterTheTemple'),
            endCondition: (creaturesObtained.tier1.length > 3 && creaturesObtained.tier2.length > 0),
            initialObjective: 'Equip 4 Tier 1 creatures and 1 Tier 2 creature to enter the temple',
            reward: '',
            waitingBranch: 'standard',
            completedBranch: 'EnterOrNot',
        },
        DefeatTempleGuardian: {
            startCondition: WorldCurrentQuests.EnterTheTemple?.status === 'complete',
            endCondition: enemiesDefeated.includes('TempleGuardian'),
            initialObjective: 'Defeat the Temple Guardian',
            reward: '',
            completedBranch: 'GuardianDefeated',
        },
    };

    useEffect(() => {
        if(event?.optionsChosen.includes('Proceed') && 
            event?.optionsChosen.includes('Continue')&&
            WorldCurrentQuests.DefeatTempleGuardian?.status != 'complete'
            ){
                navigate('/game/stage2');
        }
    }, [event, WorldCurrentQuests])


    function testTempleStatus(WorldCurrentQuestsVar){
        if(WorldCurrentQuestsVar){
            if(WorldCurrentQuestsVar.DefeatTempleGuardian?.status != 'complete'){
                return <>
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
                        </>
            } else {
                return <button className="TempleButton" onClick={() => navigate('/game/stage2')} ></button>
            }
        }
    }

    return (
        <div id="Temple">
            {testTempleStatus(WorldCurrentQuests)}
        </div>
    );
}

export default TestCharacter;