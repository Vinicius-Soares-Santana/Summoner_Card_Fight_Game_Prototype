import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './WarOfferingRoom.css';

export default function WarOfferingRoom() {
  return (
    <div className="SceneGrid TempleRoom WarOfferingRoom">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>War Offering Room · Red</h1>
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
        <RandomEncounterManager />
      </ScenePiece>

      <ScenePiece at="A8" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/east-courtyard"
          buttonText="East Courtyard"
        />
      </ScenePiece>
    </div>
  );
}
