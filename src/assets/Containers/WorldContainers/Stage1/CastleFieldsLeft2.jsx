import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { upgradeShop } from '../../../../World/worldActions';
import DialogManager from '../../DialogManager';
import ScenePiece from '../ScenePiece';
import './CastleFieldsLeft2.css';

function CastleFieldsLeft2(props){
    const worldState = useSelector((state) => state.worldState)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return  <div className='SceneGrid CastleFieldsLeft2'>

                <ScenePiece at="P9" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1/castlefieldsleft1' buttonText='Castle Fields L 1' />
                </ScenePiece>
                
            </div>
}

export default CastleFieldsLeft2;
