import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './CaptainOffice.css'

export default function CaptainOffice() {
  return (
    <div className="SceneGrid TempleRoom CaptainOffice">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Captain’s Office</h1>
      </ScenePiece>

      <ScenePiece at="G15" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/guard-corridor"
          buttonText="Guard Corridor"
        />
      </ScenePiece>
    </div>
  );
}
