import ScenePiece from '../../ScenePiece';
import NextSceneButton from '../../../NextSceneButton';
import RandomEncounterManager from '../../../../Containers/RandomEncounterManager';
import './FirstChapel.css';

export default function FirstChapel() {

  function book1Page(){
    dispatch(playerWorldActions.changeDialog(null));
    dispatch(playerWorldActions.changeDialog({
      image: '',
      title: 'Your hand should show no mercy against your enemies.',
      message: '',
      eventName: '',
      options: ['Ok'],
      proceedStep: false,
    }));
  }

  return (
    <div className="SceneGrid TempleRoom FirstChapel">
      <ScenePiece at="E8" cols={8} rows={3}>
        <h1>Chapel I - Gladius</h1>
      </ScenePiece>

      <ScenePiece at="I10" cols={2} rows={3} >
        <RandomEncounterManager />
      </ScenePiece>

      <ScenePiece at="H7" cols={1} rows={1}>
        <button onClick={book1Page}>book1Page</button>
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
