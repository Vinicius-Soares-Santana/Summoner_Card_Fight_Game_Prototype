import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { upgradeShop } from '../../../../World/worldActions';
import DialogManager from '../../DialogManager';
import TestCharacter from './Characters1/TestCharacter';
import Guard1 from './Characters1/Guard1';
import Guard2 from './Characters1/Guard2';
import Temple from './Characters1/Temple';
import ScenePiece from '../ScenePiece';
import './Stage1Main.css';




function Stage1Main(props){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickTest(event){
    dispatch(playerWorldActions.gainGold(100));
    dispatch(upgradeShop(3));
    dispatch(upgradeShop(2));
    dispatch(upgradeShop(1));
  }
  

  return  <div className='SceneGrid Stage1Main'>

            <ScenePiece at="A9" cols={1} rows={1}>
              <NextSceneButton destination='castlefieldsleft1' buttonText='Castle Fields Left' />
            </ScenePiece>

            <ScenePiece at="A6" cols={2} rows={2}>
              <TestCharacter />
            </ScenePiece>
            

            <ScenePiece at="H3" cols={2} rows={3}>
              <Guard1 />
            </ScenePiece>

            <ScenePiece at="I4" cols={2} rows={3}>
              <Guard2 />
            </ScenePiece>
            
            <ScenePiece at="D1" cols={10} rows={3}>
              <Temple />
            </ScenePiece>
            
            <ScenePiece at="F5" cols={1} rows={1}>
              <button onClick={onClickTest}>Test</button>
            </ScenePiece>

            <ScenePiece at="P9" cols={1} rows={1}>
              <NextSceneButton destination='castlefieldsright1' buttonText='Castle Fields Right' />
            </ScenePiece>
            
          </div>
}

export default Stage1Main;
