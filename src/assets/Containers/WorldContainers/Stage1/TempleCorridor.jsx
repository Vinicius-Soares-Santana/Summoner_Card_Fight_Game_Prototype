import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import Villager1 from './Characters1/Villager1';
import FairyBearerGuard from './Characters1/FairyBearerGuard';
import DialogManager from '../../DialogManager';
import ScenePiece from '../ScenePiece';
import './TempleCorridor.css';



function TempleCorridor(props){
    const worldState = useSelector((state) => state.worldState);
    const creatureSelection = useSelector((state) => state.playerWorld.selectedCreatures);
    const worldEvents = useSelector((state) => state.worldState.worldEvents);
    const EnemiesDefeated = useSelector((state) => state.playerWorld.EnemiesDefeated);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const guardianOfTheTempleDefeated = EnemiesDefeated.includes('TempleGuardian');


    return  <div className='SceneGrid TempleCorridor'>

                

                {guardianOfTheTempleDefeated && 
                    <ScenePiece at="A9" cols={1} rows={1}>
                        <NextSceneButton destination='/game/stage2' buttonText='Temple Hall' />
                    </ScenePiece>
                }

            </div>
}

export default TempleCorridor;
