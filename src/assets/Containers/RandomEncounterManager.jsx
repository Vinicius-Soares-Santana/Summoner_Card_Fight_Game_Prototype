import react, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../CardsList';
import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../store/WorldSlices/WorldStateSlice';
import { upgradeShop } from '../../World/worldActions';
import DialogManager from './DialogManager';

import './RandomEncounterManager.css';


function RandomEncounterManager(props){

    const currentWorldStage = useSelector((state) => state.worldState.currentWorldStage);
    const currentWorldLevel = useSelector((state) => state.worldState.worldCurrentLevel);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const RandomGuardImages = import.meta.glob('./Images/RandomGuards/*.png', {
        eager: true,
        query: '?url',
        import: 'default',
    });

    const ArenaStatus = useSelector(
        (state) => state.battle.status
    );

    const randonEncounterSetter = Math.random();

    const listOfGuards = [
        'templeLookout',
        'templeBroodkeeper',
        'templeBulwark',
        'templeStoneEye',
        'templeMirrorGuard',
        'templeLanternKeeper',
        'templeGraveKeeper',
        'templeBloodTithe',
        'templeSoulJailer',
        'templeRoyalCollector',]

    const selectedGuard = listOfGuards[(Math.floor(Math.random()*listOfGuards.length))]

    const guardImgLink = RandomGuardImages[`./Images/Runes/${selectedGuard}.png`]

    useEffect(() => {
        if(randonEncounterSetter < 0.2 && currentWorldStage == 'Stage2Start' && ArenaStatus == 'idle'){
        const result = dispatch(startCampaignBattle(selectedGuard));
            if (!result.ok) { return; }

            navigate('/arena');
        }
    }, [navigate]);

    if(randonEncounterSetter < 0.2){
        return (
            <div className="RandomEncounterManager" >
                <img src={guardImgLink} alt={selectedGuard} />
            </div>
            )
    }
}

export default RandomEncounterManager;