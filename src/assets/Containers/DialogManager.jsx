import react from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../CardsList';

import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';

function DialogManager(props){
    const propsCharacImage = props.characterImage;
    const propsCharacName = props.characterName;
    const propsEventName = props.eventName;
    const propsCharacterStoryLine = props.characterScript;
    
    const dialogExample = {
        'standard':{
            1:{
                ramification: false, 
                'Ok': { message: 'Hello World', status: 'dialog', options:[], proceedStep: true, }
            }, 
            2:{
                ramification: false, 
                'Ok': { message: 'Would you help me?', status: 'dialog', options:['Yes', 'No'], proceedStep: true, }
            }, 
            3:{
                ramification: true, 
                'Yes': { message: 'Potato', status: 'dialog', options:[], proceedStep: true, branch: 'Yes' }, 
                'No': { message: 'Cool', status: 'dialog', options:[], proceedStep: true,  branch: 'No' }
            },
        },
        'Yes':{
            1:{
                ramification: false, 
                'Ok': { message: 'Thanks for the help', status: 'idle', options:[], proceedStep: false, }
            }, 
        },
        'No':{
            1:{
                ramification: false, 
                'Ok': { message: 'What a bitch', status: 'idle', options:[], proceedStep: false, }
            }, 
        }
    }

    const dispatch = useDispatch();
    const thisEvent = useSelector((state) => state.worldState.worldEvents[propsEventName]);
    const dialogBoxCurrent = useSelector((state) => state.playerWorld.dialogScreen);
    let eventStatus = thisEvent?.status;
    let branch = thisEvent?.branch;

    console.log(`Event right now: ${JSON.stringify(thisEvent)}`);
    

  function onClickTest(e){

    if(!thisEvent && dialogBoxCurrent.message == ''){

        console.log('Event Added');
        dispatch(worldStateActions.addEvent({eventName: propsEventName}));
        dispatch(worldStateActions.changeEventStep({eventName: propsEventName, newStatus: 'dialog', proceedStep: true, branch: thisEvent?.branch }));

    } else if (dialogBoxCurrent.message == '' && eventStatus == 'continue') {

        dispatch(worldStateActions.changeEventStep({eventName: propsEventName, newStatus: 'dialog', proceedStep: true, }));

    } else if (dialogBoxCurrent.message == '' && eventStatus == 'idle') {

        let stepOfEvent = thisEvent.eventStep;
        const previousAnswer = thisEvent.optionsChosen[Object.keys(thisEvent.optionsChosen)[Object.keys(thisEvent.optionsChosen).length - 1]];
        const messageObj = propsCharacterStoryLine[branch][stepOfEvent] ?? {};

        console.log(`optionsChosen: ${JSON.stringify(thisEvent.optionsChosen)}`);

        dispatch(playerWorldActions.changeDialog({
            image: propsCharacImage,
            title: propsCharacName, 
            message: messageObj[previousAnswer]?.message, 
            eventName: propsEventName, 
            options: messageObj[previousAnswer]?.options,
            status: messageObj[previousAnswer]?.status,
            proceedStep: messageObj[previousAnswer]?.proceedStep,
            newBranch: messageObj[previousAnswer]?.branch
        }));

    }
  }

  useEffect(() => {

    if(thisEvent?.status == 'dialog'){
        let stepOfEvent = thisEvent.eventStep;

        const messageObj = propsCharacterStoryLine[branch][stepOfEvent] ?? {};

        if(messageObj.ramification){

            const previousAnswer = thisEvent.optionsChosen[Object.keys(thisEvent.optionsChosen)[Object.keys(thisEvent.optionsChosen).length - 1]];

            dispatch(playerWorldActions.changeDialog({
                image: propsCharacImage,
                title: propsCharacName, 
                message: messageObj[previousAnswer]?.message, 
                eventName: propsEventName, 
                options: messageObj[previousAnswer]?.options,
                status: messageObj[previousAnswer]?.status,
                proceedStep: messageObj[previousAnswer]?.proceedStep,
                newBranch: messageObj[previousAnswer]?.branch
            }));

        } else {
            const previousAnswer = 'Ok';

            dispatch(playerWorldActions.changeDialog({
                image: propsCharacImage,
                title: propsCharacName, 
                message: messageObj[previousAnswer]?.message, 
                eventName: propsEventName, 
                options: messageObj[previousAnswer]?.options,
                status: messageObj[previousAnswer]?.status,
                proceedStep: messageObj[previousAnswer]?.proceedStep,
                newBranch: messageObj[previousAnswer]?.branch
            }));
        }
        
    }
  }, [eventStatus, thisEvent])

  return <button className={`${propsCharacName} DialogManager`} onClick={onClickTest}>{propsCharacName}</button>
}

export default DialogManager;
