import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { upgradeShop } from '../../../../World/worldActions';
import DialogManager from '../../DialogManager';
import ScenePiece from '../ScenePiece';
import './Stage2Main.css';




function Stage2Main(props){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickTest(event){
    dispatch(playerWorldActions.gainGold(100));
    dispatch(upgradeShop(3));
    dispatch(upgradeShop(2));
    dispatch(upgradeShop(1));
  }
  

  return  <div className='SceneGrid Stage2Main'>

            <ScenePiece at="A9" cols={1} rows={1}>
              <NextSceneButton destination='castlefieldsleft1' buttonText='Castle Fields Left' />
            </ScenePiece>
            


            <ScenePiece at="P9" cols={1} rows={1}>
              <NextSceneButton destination='castlefieldsright1' buttonText='Castle Fields Right' />
            </ScenePiece>
            
          </div>
}

export default Stage2Main;
