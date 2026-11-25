import react from 'react';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useResolvedPath } from 'react-router-dom';

function NextSceneButton({ destination, buttonText }){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {pathName, search, hash } = useResolvedPath(destination);

    return <button className={`nextSceneButton ${destination}`} onClick={() => {
                const scenePath = `${pathName}${search}${hash}`
                dispatch(worldStateActions.setPreviousScenarioPath(scenePath));
                navigate(destination)
            }}>{buttonText}</button>;
}

export default NextSceneButton;