import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './Storeroom.css';

export default function Storeroom() {
  return (
    <div className="SceneGrid TempleRoom Storeroom">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Storeroom</h1>
      </ScenePiece>

      <ScenePiece at="G2" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/kitchen"
          buttonText="Kitchen"
        />
      </ScenePiece>
    </div>
  );
}
