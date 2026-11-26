import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './Kitchen.css';

export default function Kitchen() {
  return (
    <div className="SceneGrid TempleRoom Kitchen">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Kitchen</h1>
      </ScenePiece>

      <ScenePiece at="G2" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/east-courtyard"
          buttonText="East Courtyard"
        />
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
        <RandomEncounterManager />
      </ScenePiece>

      <ScenePiece at="G15" cols={4} rows={2}>
        <NextSceneButton
          destination="/game/stage2/storeroom"
          buttonText="Storeroom"
        />
      </ScenePiece>
    </div>
  );
}
