import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';
import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';
import './PlayerUDI.css';

function PlayerUDI(props){
    const playerInfo = useSelector((state) => state.playerWorld);
    const messageBoxInfo = playerInfo.dialogScreen;
    const dispatch = useDispatch();

    function showOptionsButtons(eventName, options, nextStatus, proceedStepChoice, newBranchToAdd = null){
        if(options != '' && options != null){
            return options.map((optionAvailable) => (
                 <button key={optionAvailable} onClick={() => 
                    {
                        dispatch(worldStateActions.changeEventStep({eventName: eventName, option: optionAvailable, newStatus: nextStatus, proceedStep: proceedStepChoice, newBranch: newBranchToAdd }));
                        dispatch(playerWorldActions.changeDialog(null));
                    }
                }>
                    {optionAvailable}
                </button>
            ))
        }
    }

    function showProfileImage(imageLink){
        if(imageLink !== '' && imageLink !== null){
            return <img src={imageLink} alt="Character Profile" />;
        } else {
            return <div className="ImageReplacer"></div>;
        }
    }



    function dialogBoxCreator(messageBox){
        if(messageBox.title != '' && messageBox.title != null){
            return  <div className="dialogBox">
                        {showProfileImage(playerInfo.dialogScreen.image)}
                        <h4>{playerInfo.dialogScreen.title}</h4>
                        <p>{playerInfo.dialogScreen.message}</p>
                        {showOptionsButtons(messageBox.eventName, messageBox.options, messageBox.status, messageBox.proceedStep, messageBox.branch)}
                    </div>
        }

    }

    return(
        <div className="PlayerUDILayer">
            <Outlet />
            <div className="PlayerUDIBar" >
                <img src="/" alt="PlayerImage" />
                <div id="UDIBasicStats">
                    <h4 id="UDIHealth">HP: {playerInfo.Health}</h4>
                    <h4 id="UDIGold">Gold: {playerInfo.Gold}</h4>
                </div>
                {dialogBoxCreator(messageBoxInfo)}
                <div className="UDITeam" >
                    <h4 id="UDITeamTitle">Current Team:</h4>
                    {Object.keys(playerInfo.selectedCreatures).map((tier) => {
                        return  <div className={`UDI${tier}`} key={`UDI${tier}`}>
                                    <h5>{tier}</h5>
                                    <ul>
                                        {playerInfo.selectedCreatures[tier]?.map(
                                            (creatureInList) => <li className="listedCreature" key={`UDI${creatureInList}`}>{creatureInList}</li>
                                            )}
                                    </ul>
                                </div>
                    })}
                </div>
            </div>
        </div>
    )
};

export default PlayerUDI;