import react from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../CardsList';

import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';

function DialogManager(props){
    const dispatch = useDispatch();
    const thisEvent = useSelector((state) => state.worldState.worldEvents['Test']);
    const dialogBoxCurrent = useSelector((state) => state.playerWorld.dialogScreen);
    let eventStatus = thisEvent?.status;

    const propsCharacImage = './'
    const propsCharacName = "Misterious Guy"
    const propsEventName = 'Test'
    const propsCharacterStoryLine = {
        branch: 'standard',
        startstep: 1,
        1:{
            ramification: false, 
            'Ok': { message: 'Hello World', status: 'dialog1', options:[], proceedStep: true, }
        }, 
        2:{
            ramification: false, 
            'Ok': { message: 'Would you help me?', status: 'dialog1', options:['Yes', 'No'], proceedStep: true, }
        }, 
        3:{
            ramification: true, 
            'Yes': { message: 'Potato', status: 'idle', options:[], proceedStep: false, }, 
            'No': { message: 'Cool', status: 'idle', options:[], proceedStep: false, }
        },
    }
    

  function onClickTest(e){
    if(!thisEvent && dialogBoxCurrent.message == ''){
        console.log('Event Added')
        dispatch(worldStateActions.addEvent({eventName: 'Test'}));
        dispatch(worldStateActions.changeEventStep({eventName: 'Test', newStatus: 'dialog1', proceedStep: true, }));
    } else if (dialogBoxCurrent.message == '' && eventStatus == 'idle') {

        let stepOfEvent = thisEvent.eventStep;
        const previousAnswer = thisEvent.optionsChosen[stepOfEvent - 1];
        const messageObj = propsCharacterStoryLine[stepOfEvent] ?? {};

        console.log(JSON.stringify(thisEvent));
        console.log(JSON.stringify(stepOfEvent));
        console.log(JSON.stringify(previousAnswer));
        console.log(JSON.stringify(messageObj));

        dispatch(playerWorldActions.changeDialog({
            image: '',
            title: propsCharacName, 
            message: messageObj[previousAnswer]?.message, 
            eventName: propsEventName, 
            options: messageObj[previousAnswer]?.options,
            status: messageObj[previousAnswer]?.status,
            proceedStep: messageObj[previousAnswer]?.proceedStep,
        }));

    }
  }

  useEffect(() => {

    if(thisEvent?.status == 'dialog1'){
        let stepOfEvent = thisEvent.eventStep;
        const messageObj = propsCharacterStoryLine[stepOfEvent] ?? {};

        if(stepOfEvent > 1){
            const previousAnswer = thisEvent.optionsChosen[stepOfEvent - 1];
            dispatch(playerWorldActions.changeDialog({
                image: '',
                title: propsCharacName, 
                message: messageObj[previousAnswer]?.message, 
                eventName: propsEventName, 
                options: messageObj[previousAnswer]?.options,
                status: messageObj[previousAnswer]?.status,
                proceedStep: messageObj[previousAnswer]?.proceedStep,
            }));
        } else {
            const previousAnswer = 'Ok';
            dispatch(playerWorldActions.changeDialog({
                image: '',
                title: propsCharacName, 
                message: messageObj[previousAnswer]?.message, 
                eventName: propsEventName, 
                options: messageObj[previousAnswer]?.options,
                status: messageObj[previousAnswer]?.status,
                proceedStep: messageObj[previousAnswer]?.proceedStep,
            }));
        }





        console.log(JSON.stringify(thisEvent));
        console.log(JSON.stringify(dialogBoxCurrent));
        
    }
  }, [eventStatus, thisEvent])

  return <button onClick={onClickTest}>Test Dialog Event</button>
}

export default DialogManager;
