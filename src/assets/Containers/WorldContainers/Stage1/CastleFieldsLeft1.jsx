import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import Villager1 from './Characters1/Villager1';
import DialogManager from '../../DialogManager';
import ScenePiece from '../ScenePiece';
import './CastleFieldsLeft1.css';

function CastleFieldsLeft1(props){
    const worldState = useSelector((state) => state.worldState)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return  <div className='SceneGrid CastleFieldsLeft1'>

                <ScenePiece at="A9" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1/castlefieldsleft2' buttonText='Castle Fields 2' />
                </ScenePiece>

                <ScenePiece at="D6" cols={2} rows={2}>
                    <Villager1 />
                </ScenePiece>

                <ScenePiece at="O9" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1' buttonText='Stage1Main' />
                </ScenePiece>
                
            </div>
}

export default CastleFieldsLeft1;
