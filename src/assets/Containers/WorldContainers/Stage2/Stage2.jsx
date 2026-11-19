import React from 'react';

import react, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';
import { upgradeShop } from '../../../../World/worldActions';
import DialogManager from '../../DialogManager';

import { Outlet } from 'react-router-dom';
import './Stage2.css';

function Stage2(props) {
  const currentWorldStage = useSelector((state) => state.worldState.currentWorldStage);
  const currentWorldLevel = useSelector((state) => state.worldState.worldCurrentLevel);
  const navigate = useNavigate()

  const ArenaStatus = useSelector(
    (state) => state.battle.status
  );

  const randonEncounterSetter = Math.random();

  const listOfGuards = ['Temple Lookout',
  'Temple Broodkeeper',
  'Temple Bulwark',
  'Stone-Eye Guard',
  'Mirror Guard',
  'Lantern Keeper',
  'Temple Gravekeeper',
  'Blood Tithe Guard',
  'Soul Jailer',
  'Royal Collector']

  const selectedGuard = listOfGuards[(Math.floor(Math.random()*listOfGuards.length))]

  useEffect(() => {
    if(randonEncounterSetter < 0.2 && currentWorldStage == 'Stage2Start' && ArenaStatus == 'idle'){
      const result = dispatch(startCampaignBattle('selectedGuard'));
          if (!result.ok) { return; }

          navigate('/arena');
    }
  }, [navigate]);


  return <div className="Stage2"><Outlet /></div>;
}

export default Stage2;