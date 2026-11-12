import React from 'react';
import { useSelector } from 'react-redux';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';

const characterName = 'Elizabeth';
const characterImage = './';
const eventName = 'ElizabethMazeEvent';

const accepted = {
    message: 'Thank you so much!',
    status: 'dialog',
    options: [],
    proceedStep: true,
    branch: 'Yes',
};

const refused = {
    message: "It\'s ok, I will find a way to save him.",
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
                message: 'Thank heavens a mage, my son got lost in the maze and is too dangerous for me to recue him.',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'Do you think you can find him? I can give anything to you',
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
                message: 'Are you sure there\'s nothing you can do?',
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
                message: 'Thank you so much. Here, wear this, he will know you are there to help when he sees it.',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'I hope he\'s safe.',
                status: 'idle',
                options: [],
                proceedStep: false,
            },
        },
        3: {ramification: false,
            Ok: {
                message: 'YOU FOUND HIM, Why would you do that, why go into that maze??? ',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        4: {ramification: false,
            Ok: {
                message: 'Thank you so much for saving him!',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        5: {ramification: false,
            Ok: {
                message: 'Here, my husband used to be a mage too, He gave me his runes long ago, but they are of little use for me but for memory.',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        6: {
            ramification: false,
            Ok: {
                message: "Take this one, I hope it helps you in your journey.",
                status: 'idle',
                options: ['Accept'],
                proceedStep: true,
                branch: 'ThankYouSoMuch',
            },
        },
    },
    ThankYouSoMuch: {
        1: {
            ramification: false,
            Ok: {
                message: 'Thank you and good luck in your journey.',
                status: 'idle',
                options: [],
                proceedStep: false,
            },
        },
    },
};

function VillagerMazeQuest() {
    const items = useSelector((state) => state.playerWorld.Items);
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );
    const WorldEvents = useSelector(
        (state) => state.worldState.worldEvents
    );

    const allQuests = {
        MazeQuest: {
            startCondition: Object.values(event?.optionsChosen ?? {}).includes('Yes'),
            endCondition: (Object.keys(WorldEvents ?? {}).includes('ElizabethsChildEvent')),
            initialObjective: 'Rescue Elizabeth\'s Son',
            reward: 'Basilisk',
            waitingBranch: 'Yes',
            completedBranch: 'ThankYouSoMuch',
            waitingStep: 2,
        },
    };

    return (
        <div id="VillagerMazeQuest">
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

export default VillagerMazeQuest;