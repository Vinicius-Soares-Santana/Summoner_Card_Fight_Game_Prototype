import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './Armory.css';

export default function Armory() {
  return (
    <div className="SceneGrid TempleRoom Armory">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Armory</h1>
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
        <RandomEncounterManager />
      </ScenePiece>

      <ScenePiece at="A8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/guard-corridor"
          buttonText="Guard Corridor"
        />
      </ScenePiece>
    </div>
  );
}
