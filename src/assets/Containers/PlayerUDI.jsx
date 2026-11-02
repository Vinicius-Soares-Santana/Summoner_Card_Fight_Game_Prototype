import react from 'react';
import { useSelector } from 'react-redux';
import './PlayerUDI.css';

function PlayerUDI(props){
    playerInfo = useSelector((state) => state.playerWorld);

    return(
        <div classname="PlayerUDI">
            <Outlet />
            <PlayerHUD health={playerInfo.Health} gold={playerInfo.Gold} />
        </div>
    )
};

export default PlayerUDI;