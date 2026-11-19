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
      }
    }
  }, [dispatch]);
  

  return  <div className='SceneGrid Stage2Main'>

            <ScenePiece at="A9" cols={1} rows={1}>
              <NextSceneButton destination='roomleft1' buttonText='Room' />
            </ScenePiece>
            


            <ScenePiece at="P9" cols={1} rows={1}>
              <NextSceneButton destination='' buttonText='Castle Fields Right' />
            </ScenePiece>
            
          </div>
}

export default Stage2Main;
