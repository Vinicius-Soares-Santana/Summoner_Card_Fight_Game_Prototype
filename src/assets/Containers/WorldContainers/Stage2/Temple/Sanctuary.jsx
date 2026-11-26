import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import GuardCapitainBlue from '../Characters2/GuardCapitainBlue';
import './Sanctuary.css';

export default function Sanctuary() {
  return (
    <div className="SceneGrid TempleRoom Sanctuary">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Sanctuary</h1>
      </ScenePiece>

      <ScenePiece at="E2" cols={8} rows={3}>
        {GuardCapitainBlue()}
      </ScenePiece>

      <ScenePiece at="M8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/west-courtyard"
          buttonText="West Courtyard"
        />
      </ScenePiece>
    </div>
  );
}
