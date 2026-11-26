import react, {useState} from 'react';
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
import './CastleFieldsRight1.css';



function randomEnemy(listOfEnemys){
    const index = Math.floor(Math.random() * listOfEnemys.length);
    return listOfEnemys[index];
  }




function CastleFieldsRight1(props){
    const worldState = useSelector((state) => state.worldState);
    const creatureSelection = useSelector((state) => state.playerWorld.selectedCreatures);
    const FairyBearerEvent = useSelector(
        (state) => state.worldState.worldEvents['FairyGuardBattle']
    );

    const [randomEnemyChosen, setRandomEnemyChosen] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const showFairyBearer = (creatureSelection?.tier1.length > 2 && !Object.values(FairyBearerEvent?.optionsChosen ?? {}).includes('I won\'t'));


    const stage1EnemyIds = [
        'fieldScout',
        'goblinRecruiter',
        'Acolite1',
        'basiliskHandler',
        'cryptKeeper',
      ];

    if (worldState.worldCurrentLevel > 1){

        const listOfGuards = [
            'templeLookout',
            'templeBroodkeeper',
            'templeBulwark',
            'templeStoneEye',
            'templeMirrorGuard',
            'templeLanternKeeper',
            'templeGraveKeeper',
            'templeBloodTithe',
            'templeSoulJailer',
            'templeRoyalCollector',]

        listOfGuards.forEach((enemy) => stage1EnemyIds.push(enemy))

    }
    


    return  <div className='SceneGrid CastleFieldsRight1'>

                <ScenePiece at="A9" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1' buttonText='Stage1Main' />
                </ScenePiece>
                

                <ScenePiece at="E2" cols={5} rows={2}>
                    <div className="ArenaDivRandomEnemy" onClick={() => setRandomEnemyChosen(randomEnemy(stage1EnemyIds))} >
                        <ArenaButton enemyId={randomEnemyChosen != '' ? randomEnemyChosen : randomEnemy(stage1EnemyIds)} difficulty='normal' />
                    </div>
                </ScenePiece>

                <ScenePiece at="D6" cols={2} rows={2}>
                    <Villager1 />
                </ScenePiece>

                <ScenePiece at="L12" cols={2} rows={3}>
                    <button onClick={() => navigate('/shop')}>Shop</button>
                </ScenePiece>

                {showFairyBearer &&
                    <ScenePiece at="N14" cols={2} rows={3}>
                        <FairyBearerGuard />
                    </ScenePiece>
                }

                
            </div>
}

export default CastleFieldsRight1;
