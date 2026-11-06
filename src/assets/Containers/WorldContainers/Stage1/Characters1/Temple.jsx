import React from 'react';
import { useSelector } from 'react-redux';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';

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
                message: 'Hi Stranger',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'Can you help me test a quest real quick?',
                status: 'dialog',
                options: ['Yes', 'No'],
                proceedStep: true,
            },
        },
        3: {
            ramification: true,
            Yes: accepted,
            No: refused,
        },
    },
    No: {
        1: {
            ramification: false,
            Ok: {
                message: 'Did you change your mind?',
                status: 'dialog',
                options: ['Yes', 'No'],
                proceedStep: true,
            },
        },
        2: {
            ramification: true,
            Yes: accepted,
            No: refused,
        },
    },
    Yes: {
        1: {
            ramification: false,
            Ok: {
                message: 'Still waiting for that potato.',
                status: 'idle',
                options: [],
                proceedStep: false,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: "YOU MADE IT! Here's a potion as a reward.",
                status: 'idle',
                options: [],
                proceedStep: true,
                branch: 'CONGRATULATIONS',
            },
        },
    },
    CONGRATULATIONS: {
        1: {
            ramification: false,
            Ok: {
                message: 'Thanks for bringing the potato!',
                status: 'idle',
                options: [],
                proceedStep: false,
            },
        },
    },
};

function TestCharacter() {
    const items = useSelector((state) => state.playerWorld.Items);
    const enemiesDefeated = useSelector((state) => state.playerWorld.enemiesDefeated);
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
        },
        DefeatTempleGuardian: {
            startCondition: WorldCurrentQuests.EnterTheTemple?.status === 'complete',
            endCondition: enemiesDefeated.includes('TempleGuardian'),
            initialObjective: 'Defeat the Temple Guardian',
            reward: '',
        },
    };

    return (
        <div id="Temple">
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

export default TestCharacter;