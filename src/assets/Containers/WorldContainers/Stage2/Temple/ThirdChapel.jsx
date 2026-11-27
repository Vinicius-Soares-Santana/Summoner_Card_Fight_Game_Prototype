import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './ThirdChapel.css';

export default function ThirdChapel() {
  return (
    <div className="SceneGrid TempleRoom ThirdChapel">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Chapel III - Fidelis</h1>
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
        <RandomEncounterManager />
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
