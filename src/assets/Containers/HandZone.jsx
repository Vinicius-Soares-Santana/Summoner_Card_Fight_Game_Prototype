import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreatureCard from '../Presentational/CreatureCard';
import { cardSlotCursorActions } from '../../store/CardSlotCursor';
import { TurnActions } from '../../store/TurnSlice';
import { canHumanControl } from '../../Battle/battleRules';
import './HandZone.css';

function HandZone(props) {
  const dispatch = useDispatch();
  const CardSelected = useSelector((state) => state.cardslotcursor.selected);
  const Turn = useSelector((state) => state.turn);
  const canControl = useSelector((state) => canHumanControl(state, props.playerId));
  const playerId = props.handToShow.replace('hand', '');

  let zoneSelectedOrNot;

  function handleClick(event) {
    if(canControl && Turn.stage == 'Place'){
      dispatch(
        cardSlotCursorActions.toggleSelect({
          selected: props.Creature,
          side: props.handToShow,
        })
      );
    }
  }

  function showButton(CreatureId) {
    if (!canControl) return null;
    if (CardSelected == CreatureId) {
      zoneSelectedOrNot = 'selected';
    } else {
      zoneSelectedOrNot = '';
      return (
        <button className="handCardSelectButton" onClick={handleClick}>
          Select Card
        </button>
      );
    }
  }

  return (
    <div id="HandZone" className={`HandZone ${zoneSelectedOrNot}`}>
      <CreatureCard Creature={props.Creature} />
      {showButton(props.Creature)}
      <p>{CardSelected}</p>
    </div>
  );
}

export default HandZone;
