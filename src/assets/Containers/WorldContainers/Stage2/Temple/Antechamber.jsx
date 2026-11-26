import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './Antechamber.css';

export default function Antechamber() {
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

      <ScenePiece at="G15" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/power-offering-room"
          buttonText="Power Offering Room"
        />
      </ScenePiece>
    </div>
  );
}
