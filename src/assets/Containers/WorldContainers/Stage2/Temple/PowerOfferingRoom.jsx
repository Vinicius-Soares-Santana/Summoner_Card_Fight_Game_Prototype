import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import './PowerOfferingRoom.css';

export default function PowerOfferingRoom() {
  return (
    <div className="SceneGrid TempleRoom PowerOfferingRoom">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Power Offering Room · Purple</h1>
      </ScenePiece>

      <ScenePiece at="G9" cols={4} rows={2}>
        <div className="ManaChallengePurpleTotem" >
          <NextSceneButton
            destination="/game/stage2/manachallengepurple"
            buttonText=""
          />
        </div>
      </ScenePiece>

      <ScenePiece at="G2" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/antechamber"
          buttonText="Antechamber"
        />
      </ScenePiece>
    </div>
  );
}
