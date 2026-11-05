import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import SelectCreaturesButton from '../../../Presentational/SelectCreaturesButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { upgradeShop } from '../../../../World/worldActions';
import DialogManager from '../../DialogManager';
import TestCharacter from './TestCharacter';
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

  return  <div className='Stage1Main'>
            <SelectCreaturesButton />
            <ArenaButton enemyId='ragnarokKeeper' difficulty='normal' />
            <TestCharacter />
            <button onClick={() => navigate('/shop')}>Shop</button>
            <button onClick={onClickTest}>Test</button>
            <button onClick={()=>navigate('castlefieldsleft1')}>Castle Fields Left</button>
          </div>
}

export default Stage1Main;
