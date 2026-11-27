import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import ProtectionMagicBook from '../Characters2/ProtectionMagicBook';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';

import './SecondChapel.css';

export default function SecondChapel() {



  return (
    <div className="SceneGrid TempleRoom SecondChapel">
      <ScenePiece at="E8" cols={8} rows={3} >
        <h1>Chapel II - Scutum</h1>
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
        <RandomEncounterManager />
      </ScenePiece>

      <ScenePiece at="K10" cols={2} rows={3} >
        {ProtectionMagicBook()}
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
