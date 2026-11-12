import React from 'react';
import { useSelector } from 'react-redux';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';
import './Guard2.css';

const characterName = 'Jason';
const characterImage = './';
const eventName = 'ElizabethsChildEvent';


const characterScript = {
    standard: {
        1: {
            ramification: false,
            Ok: {
                message: 'Who are you?',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        2: {
            ramification: false,
            Ok: {
                message: 'I recognize this, did my mom send you?',
                status: 'dialog',
                options: [],
                proceedStep: true,
            },
        },
        3: {
            ramification: false,
            Ok: {
                message: 'Thank you very much, I hide hear when I heard that noise coming.',
                status: 'complete',
                options: [],
                proceedStep: true,
            },
        
        },
    },
       
};

function ElizabethSon() {
    const worldStats = useSelector((state) => state.worldState.currentWorldStage)
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );

    return (
        <div id="ElizabethSon">
            <DialogManager
                characterName={characterName}
                characterImage={characterImage}
                eventName={eventName}
                characterScript={characterScript}
            />
        </div>
    );
}

export default ElizabethSon;