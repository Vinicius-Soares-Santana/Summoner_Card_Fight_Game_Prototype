import React from 'react';
import { useSelector } from 'react-redux';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';
import './Guard2.css';

const characterName = 'Guard';
const characterImage = './';
const eventName = 'TalkToGuard2';


const characterScript = {
    standard: {
        1: {
            ramification: false,
            Ok: {
                message: 'Back off!',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'Wait, you look familiar...',
                status: 'idle',
                options: [],
                proceedStep: true,
                branch: 'standard',
            },
        
        },
    },
       
};

function Guard2() {
    const worldStats = useSelector((state) => state.worldState.currentWorldStage)
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );

    return (
        <div id="Guard2">
            <DialogManager
                characterName={characterName}
                characterImage={characterImage}
                eventName={eventName}
                characterScript={characterScript}
            />
        </div>
    );
}

export default Guard2;