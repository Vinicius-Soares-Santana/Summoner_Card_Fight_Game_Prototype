import ScenePiece from '../../ScenePiece';
import { useDispatch, useSelector } from 'react-redux';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './Antechamber.css';

export default function Antechamber() {
  
  const currentChallengesComplete = useSelector((state) => state.worldState.stage2ManaPuzzlesSolved);

  const mandatoryChallenges = ['red', 'blue'];

  const AllDone = mandatoryChallenges.every((name) => currentChallengesComplete.includes(name));


  function purpleChallengeDoor(test){
    if(test){
      return (<ScenePiece at="G15" cols={4} rows={2}>
                <NextSceneButton
                  destination="/game/stage2/power-offering-room"
                  buttonText="Power Offering Room"
                />
              </ScenePiece>)
    } else {
      return (<div className="closedPurpleChallengeDoor"></div>)
    }
  }

  return (
    <div className="SceneGrid TempleRoom Antechamber">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Antechamber</h1>
      </ScenePiece>

      <ScenePiece at="G2" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/guard-corridor"
          buttonText="Guard Corridor"
        />
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
              <RandomEncounterManager />
      </ScenePiece>

      {purpleChallengeDoor(AllDone)}
    </div>
  );
}
