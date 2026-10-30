import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import SelectCreaturesButton from '../../../Presentational/SelectCreaturesButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import './Stage1Main.css';

function Stage1Main(props){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onClickTest(event){
    Object.keys(CardsList).forEach((card) => dispatch(playerWorldActions.addAvailableCreature({creatureName: card})));
  }

  return  <div className='Stage1Main'>
            <SelectCreaturesButton />
            <ArenaButton enemyId='goblinCaptain' difficulty='easy' />
            <button onClick={onClickTest}>Test</button>
          </div>
}

export default Stage1Main;
