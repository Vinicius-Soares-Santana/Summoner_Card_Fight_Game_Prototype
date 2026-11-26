import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './ChapelWing.css';

export default function ChapelWing() {
  return (
    <div className="SceneGrid TempleRoom ChapelWing">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Chapel Wing</h1>
      </ScenePiece>

      <ScenePiece at="A4" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/chapel-1"
          buttonText="Chapel I"
        />
      </ScenePiece>

      <ScenePiece at="A8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/chapel-2"
          buttonText="Chapel II"
        />
      </ScenePiece>

      <ScenePiece at="A12" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/chapel-3"
          buttonText="Chapel III"
        />
      </ScenePiece>

      <ScenePiece at="M6" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2"
          buttonText="Main Hall"
        />
      </ScenePiece>
    </div>
  );
}
