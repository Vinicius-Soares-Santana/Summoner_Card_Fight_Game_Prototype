import react from 'react';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NextSceneButton({ destination, buttonText }){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(worldStateActions.setPreviousScenarioPath(destination));

    return <button className={`nextSceneButton ${destination}`} onClick={() => navigate(destination)}>{buttonText}</button>;
}

export default NextSceneButton;