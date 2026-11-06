import React from 'react';
import { useSelector } from 'react-redux';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';
import './Guard1.css';

const characterName = 'Guard';
const characterImage = './';
const eventName = 'TalkToGuard1';


const characterScript = {
    standard: {
        1: {
            ramification: false,
            Ok: {
                message: 'You will need more than that to enter the temple...',
                status: 'idle',
                options: [],
                proceedStep: false,
                branch: 'standard',
            },
        },
    },
       
};

function Guard1() {
    const worldStats = useSelector((state) => state.worldState.currentWorldStage)
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );

    return (
        <div id="Guard1">
            <DialogManager
                characterName={characterName}
                characterImage={characterImage}
                eventName={eventName}
                characterScript={characterScript}
            />
        </div>
    );
}

export default Guard1;