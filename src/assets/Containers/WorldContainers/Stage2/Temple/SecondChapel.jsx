import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './SecondChapel.css';

export default function SecondChapel() {
  return (
    <div className="SceneGrid TempleRoom SecondChapel">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Chapel II</h1>
      </ScenePiece>

      <ScenePiece at="M8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/chapels"
          buttonText="Chapel Wing"
        />
      </ScenePiece>
    </div>
  );
}
