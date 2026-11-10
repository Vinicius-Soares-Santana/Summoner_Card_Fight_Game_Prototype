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
import './CastleFieldsLeft1.css';

function CastleFieldsLeft1(props){
    const worldState = useSelector((state) => state.worldState)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return  <div className='SceneGrid CastleFieldsLeft1'>
                <NextSceneButton destination='/game/stage1/castlefieldsleft2' buttonText='Castle Fields 2' />
                <SelectCreaturesButton />
                <NextSceneButton destination='/game/stage1' buttonText='Stage1Main' />
            </div>
}

export default CastleFieldsLeft1;
