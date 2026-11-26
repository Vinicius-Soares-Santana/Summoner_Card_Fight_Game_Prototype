import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './WestCourtyard.css';

export default function WestCourtyard() {
  return (
    <div className="SceneGrid TempleRoom WestCourtyard">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>West Courtyard</h1>
      </ScenePiece>

      <ScenePiece at="G2" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/protection-offering-room"
          buttonText="Protection Offering Room"
        />
      </ScenePiece>

      <ScenePiece at="A8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/sanctuary"
          buttonText="Sanctuary"
        />
      </ScenePiece>

      <ScenePiece at="M11" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2"
          buttonText="Main Hall"
        />
      </ScenePiece>
    </div>
  );
}
