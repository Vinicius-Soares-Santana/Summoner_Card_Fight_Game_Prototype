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

  return <div className="Stage2"><Outlet /></div>;
}

export default Stage2;