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

function CastleFieldsLeft1(props){
    const worldState = useSelector((state) => state.worldState)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return  <div className='CastleFieldsLeft1'>
                <SelectCreaturesButton />
                <button onClick={()=>navigate('stage1main')}>Stage1Main</button>
            </div>
}

export default CastleFieldsLeft1;
