import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './GuardCorridor.css';

export default function GuardCorridor() {
  return (
    <div className="SceneGrid TempleRoom GuardCorridor">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Guard Corridor</h1>
      </ScenePiece>

      <ScenePiece at="G2" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/captain-office"
          buttonText="Captain’s Office"
        />
      </ScenePiece>

      <ScenePiece at="A8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2"
          buttonText="Main Hall"
        />
      </ScenePiece>

      <ScenePiece at="M5" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/armory"
          buttonText="Armory"
        />
      </ScenePiece>

      <ScenePiece at="M11" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/shield-room"
          buttonText="Shield Room"
        />
      </ScenePiece>

      <ScenePiece at="G15" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/antechamber"
          buttonText="Antechamber"
        />
      </ScenePiece>
    </div>
  );
}
