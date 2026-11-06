import react from 'react';
import { useNavigate } from 'react-router-dom';

function NextSceneButton({ destination, buttonText }){
    const navigate = useNavigate();
    return <button className={`nextSceneButton ${destination}`} onClick={() => navigate(destination)}>{buttonText}</button>;
}

export default NextSceneButton;