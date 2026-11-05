import react from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import QuestManager from '../../QuestManager';
import DialogManager from '../../DialogManager';

function TestCharacter(props) {
    const characterName = 'James';
    const characterImage = './';
    const eventName = 'TestEvent';


    const playerInfo = useSelector((state) => state.playerWorld);
    const dialogInfo = useSelector((state) => state.worldState.worldEvents[eventName]);

    const characterScript = {
        'standard':{
            1:{
                ramification: false, 
                'Ok': { message: 'Hi Stranger', status: 'dialog', options:[], proceedStep: true, }
            }, 
            2:{
                ramification: false, 
                'Ok': { message: 'Can you help me test a quest real quick?', status: 'dialog', options:['Yes', 'No'], proceedStep: true, }
            }, 
            3:{
                ramification: true, 
                'Yes': { message: 'NICE!', status: 'dialog', options:[], proceedStep: true, branch: 'Yes' }, 
                'No': { message: 'I mean, that\'s not exactly an option, but ok...', status: 'dialog', options:[], proceedStep: true,  branch: 'No' }
            },
        },
        'Yes':{
            1:{
                ramification: false, 
                'Ok': { message: 'waiting for that Potato', status: 'idle', options:[], proceedStep: false, }
            }, 
            2:{
                ramification: false, 
                'Ok': { message: 'YOU MADE IT, here\'s a potion as reward', status: 'dialog', options:[], proceedStep: true, branch: 'CONGRATULATIONS'}
            }, 
        },
        'No':{
            1:{
                ramification: true, 
                'Yes': { message: 'NICE!', status: 'dialog', options:[], proceedStep: true, branch: 'Yes' }, 
                'No': { message: 'I mean, that\'s not exactly an option, but ok...', status: 'idle', options:[], proceedStep: true,  branch: 'changeYourMind' }
            },
        },
        'changeYourMind': {
            1:{
                ramification: false, 
                'No': { message: 'did you change your mind?', status: 'dialog', options:['Yes', 'No'], proceedStep: false, branch: 'No' }
            }, 
        },
        'CONGRATULATIONS': {
            1:{
                ramification: false, 
                'Ok': { message: 'did you change your mind?', status: 'idle', options:[], proceedStep: false, }
            }, 
        }
    };



    let startCondition = dialogInfo ? Object.values(dialogInfo.optionsChosen).includes('Yes') : false;
    let endCondition = playerInfo ? playerInfo.Items.includes('Potato') : false;


    const allQuests = {
        TestQuest: {startCondition: startCondition, endCondition: endCondition, initialObjective: 'Buy Potatoes', reward: 'Potion'},
    }



    return (
        <div id="TestCharacter">
            <DialogManager characterName={characterName} characterImage={characterImage} eventName={eventName} characterScript={characterScript} />
            <QuestManager characterName={characterName} eventName={eventName} allQuests={allQuests} />
        </div>
    );
}

export default TestCharacter;
