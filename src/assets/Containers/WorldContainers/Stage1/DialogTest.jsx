import react from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';

import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';

function DialogTest(props){
    const dispatch = useDispatch();
    const thisEvent = useSelector((state) => state.worldState.worldEvents['Test']);
    const dialogBoxCurrent = useSelector((state) => state.playerWorld.dialogScreen);
    let eventStatus = thisEvent?.status;

  function onClickTest(e){
    if(!thisEvent && dialogBoxCurrent.message == ''){
        console.log('Event Added')
        dispatch(worldStateActions.addEvent({eventName: 'Test'}));
        dispatch(worldStateActions.changeEventStep({eventName: 'Test', newStatus: 'dialog1' }));
    }

    console.log(JSON.stringify(thisEvent));
    
  }

  useEffect(() => {

    if(thisEvent?.status == 'dialog1'){
        let stepOfEvent = thisEvent.eventStep;
        console.log(stepOfEvent);

        switch(stepOfEvent){

            case 1:
                dispatch(playerWorldActions.changeDialog({
                    image: '',
                    title: 'Misterius Guy', 
                    message: 'Hello World', 
                    eventName: 'Test', 
                    options: ['Ok']
                }));
                console.log('Hello World');
                break;

            case 2:
                dispatch(playerWorldActions.changeDialog({
                    image: '',
                    title: 'Misterius Guy', 
                    message: 'Would you help me?', 
                    eventName: 'Test', 
                    options: ['Yes', 'No']
                }));
                console.log('Would you help me?');
                break;

            case 3:
                const answer = thisEvent.optionsChosen[2];
                if(answer && answer == 'Yes'){
                    dispatch(playerWorldActions.changeDialog({
                        image: '',
                        title: 'Misterius Guy', 
                        message: 'Potato', 
                        eventName: 'Test', 
                        options: ['Ok']
                    }))
                    dispatch(worldStateActions.changeEventStep({eventName: 'Test', newStatus: 'action' }));
                } else if (answer && answer == 'No') {
                    dispatch(playerWorldActions.changeDialog({
                        image: '',
                        title: 'Misterius Guy', 
                        message: 'Cool', 
                        eventName: 'Test', 
                        options: ['Ok']
                    }))
                    dispatch(worldStateActions.changeEventStep({eventName: 'Test', newStatus: 'action' }));
                }
                
                break;
            
        }
        
    }
  }, [eventStatus, thisEvent])

  return <button onClick={onClickTest}>Test Dialog Event</button>
}

export default DialogTest;
