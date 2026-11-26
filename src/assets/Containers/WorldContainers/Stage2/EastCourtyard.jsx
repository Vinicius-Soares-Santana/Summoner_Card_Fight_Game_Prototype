import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './EastCourtyard.css';

export default function EastCourtyard() {
  return (
    <div className="SceneGrid TempleRoom EastCourtyard">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>East Courtyard</h1>
      </ScenePiece>

      <ScenePiece at="A9" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2"
          buttonText="Main Hall"
        />
      </ScenePiece>

      <ScenePiece at="M8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/war-offering-room"
          buttonText="War Offering Room"
        />
      </ScenePiece>

      <ScenePiece at="G15" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/kitchen"
          buttonText="Kitchen"
        />
      </ScenePiece>
    </div>
  );
}
