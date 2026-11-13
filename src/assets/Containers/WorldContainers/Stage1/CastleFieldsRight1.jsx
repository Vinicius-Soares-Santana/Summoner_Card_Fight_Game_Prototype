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
import './CastleFieldsRight1.css';



function randomEnemy(listOfEnemys){
    const index = Math.floor(Math.random() * listOfEnemys.length);
    return listOfEnemys[index];
  }




function CastleFieldsRight1(props){
    const worldState = useSelector((state) => state.worldState)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const stage1EnemyIds = [
        'fieldScout',
        'goblinRecruiter',
        'Acolite1',
        'basiliskHandler',
        'cryptKeeper',
      ];
    


    return  <div className='SceneGrid CastleFieldsRight1'>

                <ScenePiece at="A9" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1/castlefieldsleft2' buttonText='Castle Fields 2' />
                </ScenePiece>

                <ScenePiece at="M2" cols={5} rows={2}>
                    <ArenaButton enemyId={randomEnemy(stage1EnemyIds)} difficulty='normal' />
                </ScenePiece>

                <ScenePiece at="D6" cols={2} rows={2}>
                    <Villager1 />
                </ScenePiece>

                <ScenePiece at="G12" cols={2} rows={3}>
                    <button onClick={() => navigate('/shop')}>Shop</button>
                </ScenePiece>

                <ScenePiece at="O9" cols={1} rows={1}>
                    <NextSceneButton destination='/game/stage1' buttonText='Stage1Main' />
                </ScenePiece>
                
            </div>
}

export default CastleFieldsRight1;
