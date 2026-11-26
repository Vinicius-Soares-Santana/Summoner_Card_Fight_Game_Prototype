import react, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';
import { upgradeShop } from '../../../../World/worldActions';

import RandomEncounterManager from '../../../Containers/RandomEncounterManager';
import DialogManager from '../../DialogManager';
import ScenePiece from '../ScenePiece';
import './Stage2Main.css';




function Stage2Main(props){
  const currentWorldStage = useSelector((state) => state.worldState.currentWorldStage);
  const currentWorldLevel = useSelector((state) => state.worldState.worldCurrentLevel);
  const currentShopLevel = useSelector((state) => state.shop.ShopLevel);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

 

  useEffect(() => {
    if(currentWorldStage != 'Stage2Start' && currentWorldLevel < 2){
      dispatch(worldStateActions.nextStage({StageName:'Stage2Start', StageNumber: 2}));
      if(currentShopLevel < 2){
        dispatch(upgradeShop(2));
        dispatch(playerWorldActions.changeDialog({
          image: '',
          title: 'Shop Updated',
          message: 'The shop was updated with new items.',
          eventName: '',
          options: ['Ok'],
          proceedStep: false,
        }));
      }
    }
  }, [dispatch]);
  

  return  <div className='SceneGrid Stage2Main'>

            <ScenePiece at="A5" cols={1} rows={1}>
              <NextSceneButton destination='west-courtyard' buttonText='' />
            </ScenePiece>

            <ScenePiece at="A12" cols={1} rows={1}>
              <NextSceneButton destination='chapels' buttonText='' />
            </ScenePiece>

            <ScenePiece at="N9" cols={1} rows={1}>
              <NextSceneButton destination='armory' buttonText='' />
            </ScenePiece>

            <ScenePiece at="I10" cols={2} rows={3} >
              <RandomEncounterManager />
            </ScenePiece>
            

            <ScenePiece at="P9" cols={1} rows={1}>
              <NextSceneButton destination='templecorridor' buttonText='Temple Entrance' />
            </ScenePiece>
            
          </div>
}

export default Stage2Main;
