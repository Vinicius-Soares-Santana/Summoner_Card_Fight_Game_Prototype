import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './FirstChapel.css';

export default function FirstChapel() {
  return (
    <div className="SceneGrid TempleRoom FirstChapel">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Chapel I</h1>
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
