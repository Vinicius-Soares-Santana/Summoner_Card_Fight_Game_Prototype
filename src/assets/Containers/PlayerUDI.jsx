import react from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './PlayerUDI.css';

function PlayerUDI(props){
    const playerInfo = useSelector((state) => state.playerWorld);

    return(
        <div className="PlayerUDILayer">
            <Outlet />
            <div className="PlayerUDIBar" >
                <img src="/" alt="PlayerImage" />
                <h4 id="UDIHealth">HP: {playerInfo.Health}</h4>
                <h4 id="UDIGold">Gold: {playerInfo.Gold}</h4>
                <div className="UDITeam" >
                    <h4 id="UDITeamTitle">Current Team:</h4>
                    {Object.keys(playerInfo.selectedCreatures).map((tier) => {
                        return  <div className={`UDI${tier}`} key={`UDI${tier}`}>
                                    <h5>{tier}</h5>
                                    <ul>
                                        {playerInfo.selectedCreatures[tier]?.map((creatureInList) => <li className="listedCreature" key={`UDI${creatureInList}`}>{creatureInList}</li>)}
                                    </ul>
                                </div>
                    })}
                </div>
            </div>
        </div>
    )
};

export default PlayerUDI;