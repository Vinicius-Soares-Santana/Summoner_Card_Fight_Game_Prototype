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


  function onClickTest(event){
    dispatch(playerWorldActions.gainGold(100));
    dispatch(upgradeShop(3));
    dispatch(upgradeShop(2));
    dispatch(upgradeShop(1));
  }


  function clue1Challenge(){
    dispatch(playerWorldActions.changeDialog(null));
    dispatch(playerWorldActions.changeDialog({
      image: '',
      title: 'Ripped Letter',
      message: 'I was caught before balancing the seal, I failed, I\'m sorry',
      eventName: '',
      options: ['Ok'],
      proceedStep: false,
    }));
  }

  

 

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

            <ScenePiece at="P3" cols={1} rows={1}>
              <NextSceneButton destination='east-courtyard' buttonText='' />
            </ScenePiece>

            <ScenePiece at="P9" cols={1} rows={1}>
              <NextSceneButton destination='guard-corridor' buttonText='' />
            </ScenePiece>

            <ScenePiece at="F5" cols={1} rows={1}>
              <button onClick={onClickTest}>Test</button>
            </ScenePiece>

            <ScenePiece at="H7" cols={1} rows={1}>
              <button onClick={instruction1Challenge}>Clue</button>
            </ScenePiece>

            <ScenePiece at="L12" cols={2} rows={3}>
                <button onClick={() => navigate('/shop')}>Shop</button>
            </ScenePiece>

            <ScenePiece at="G1" cols={2} rows={2}>
              <div className="BossGateButton" >
                <NextSceneButton
                  destination="/game/stage2/bossgate"
                  buttonText=""
                />
              </div>
            </ScenePiece>

            <ScenePiece at="I3" cols={4} rows={2}>
              <div className="ManaChallengeGrayTotem" >
                <NextSceneButton
                  destination="/game/stage2/manachallengegray"
                  buttonText=""
                />
              </div>
            </ScenePiece>
            

            <ScenePiece at="G12" cols={1} rows={1}>
              <NextSceneButton destination='/game/stage1/templecorridor' buttonText='Temple Entrance' />
            </ScenePiece>
            
          </div>
}

export default Stage2Main;
