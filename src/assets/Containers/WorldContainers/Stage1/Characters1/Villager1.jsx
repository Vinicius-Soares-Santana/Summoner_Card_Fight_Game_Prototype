import React from 'react';
import { useSelector } from 'react-redux';
import QuestManager from '../../../QuestManager';
import DialogManager from '../../../DialogManager';
import './Villager1.css';

const characterName = 'Villager';
const characterImage = './';
const eventName = 'TakToVillager1';


const characterScript = {
    standard: {
        1: {
            ramification: false,
            Ok: {
                message: 'I\'m waiting to see the visyr, they say he can heal anyone',
                status: 'idle',
                options: [],
                proceedStep: false,
                branch: 'standard',
            },
        },
    },
       
};

function Villager1() {
    const worldStats = useSelector((state) => state.worldState.currentWorldStage)
    const event = useSelector(
        (state) => state.worldState.worldEvents[eventName]
    );

    return (
        <div id="Villager1">
            <DialogManager
                characterName={characterName}
                characterImage={characterImage}
                eventName={eventName}
                characterScript={characterScript}
            />
        </div>
    );
}

export default Villager1;