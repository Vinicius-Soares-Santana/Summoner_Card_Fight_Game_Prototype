import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import SelectCreaturesButton from '../../../Presentational/SelectCreaturesButton';
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

            <NextSceneButton destination='castlefieldsleft1' buttonText='Castle Fields Left' />

            <SelectCreaturesButton />

            <ArenaButton enemyId='ragnarokKeeper' difficulty='normal' />
            <TestCharacter />

            <ScenePiece at="E5" cols={2} rows={3}>
              <Guard1 />
            </ScenePiece>

            <ScenePiece at="E5" cols={2} rows={3}>
              <Guard2 />
            </ScenePiece>
            

            <Temple />

            <button onClick={() => navigate('/shop')}>Shop</button>

            <button onClick={onClickTest}>Test</button>
            
          </div>
}

export default Stage1Main;
