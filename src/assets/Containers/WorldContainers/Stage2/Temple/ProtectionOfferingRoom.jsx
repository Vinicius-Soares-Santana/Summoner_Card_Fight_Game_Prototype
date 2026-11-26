import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './ProtectionOfferingRoom.css';

export default function ProtectionOfferingRoom() {
  return (
    <div className="SceneGrid TempleRoom ProtectionOfferingRoom">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Protection Offering Room · Blue</h1>
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
        <RandomEncounterManager />
      </ScenePiece>

      <ScenePiece at="G15" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/west-courtyard"
          buttonText="West Courtyard"
        />
      </ScenePiece>
    </div>
  );
}
