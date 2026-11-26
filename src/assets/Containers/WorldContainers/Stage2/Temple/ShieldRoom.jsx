import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './ShieldRoom.css';

export default function ShieldRoom() {
  return (
    <div className="SceneGrid TempleRoom ShieldRoom">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Shield Room</h1>
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
