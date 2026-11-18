import react from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../../../CardsList';
import ArenaButton from '../../ArenaButton';
import NextSceneButton from '../../../Containers/NextSceneButton';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import TempleGuardian from './Characters1/TempleGuardian';
import DialogManager from '../../DialogManager';
import ScenePiece from '../ScenePiece';
import './TempleCorridor.css';



function TempleCorridor(props){
    const worldState = useSelector((state) => state.worldState);
    const creatureSelection = useSelector((state) => state.playerWorld.selectedCreatures);
    const worldEvents = useSelector((state) => state.worldState.worldEvents);
    const EnemiesDefeated = useSelector((state) => state.playerWorld.EnemiesDefeated);
    const templeGuardianComplete = useSelector(
        (state) =>
            state.worldState.quests.TempleGuardianBossBattle?.questStatus === 'complete'
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const guardianOfTheTempleDefeated = EnemiesDefeated.includes('TempleGuardian');

    const health = useSelector((state) => state.playerWorld.Health);

    const canFight =
        health > 0 &&
        creatureSelection.tier1.length >= 4 &&
        creatureSelection.tier2.length >= 2;

    const showGuardian =
        !templeGuardianComplete &&
        (canFight || guardianOfTheTempleDefeated);

    
    if(!canFight && !guardianOfTheTempleDefeated && !guardianOfTheTempleDefeated){
        <p>You need HP, 4 Tier 1 creatures, and 2 Tier 2 creatures equipped.</p>
        return  
            <div className='SceneGrid PreparationBlockScreen'>

                <p>You need HP, 4 Tier 1 creatures, and 2 Tier 2 creatures equipped.</p>


                <ScenePiece at="H12" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1' buttonText='Return' />
                </ScenePiece>

            </div>
    }
    return  <div className='SceneGrid TempleCorridor'>

                {!templeGuardianComplete && 
                    <ScenePiece at="G9" cols={2} rows={3}>
                        <TempleGuardian />
                    </ScenePiece>
                }

                {guardianOfTheTempleDefeated && 
                    <ScenePiece at="H2" cols={1} rows={1}>
                        <NextSceneButton destination='/game/stage2' buttonText='Temple Hall' />
                    </ScenePiece>
                }

                <ScenePiece at="H12" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1' buttonText='Return' />
                </ScenePiece>

            </div>
}

export default TempleCorridor;
