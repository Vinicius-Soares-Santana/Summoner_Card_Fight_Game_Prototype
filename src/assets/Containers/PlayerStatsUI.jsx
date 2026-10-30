import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TurnActions } from '../../store/TurnSlice';
import { cardAttackCursorActions } from '../../store/CardAttackCursor';
import { cardSlotCursorActions } from '../../store/CardSlotCursor';
import { canHumanControl } from '../../Battle/battleRules';
import { playAction } from '../../Battle/battleActions';
import './PlayerStatsUI.css';

function PlayerStatsUI(props) {
  const health = useSelector((state) => state.player[props.className].health);
  const mana = useSelector((state) => state.player[props.className].mana);
  const tier = useSelector((state) => state.player[props.className].manaTier);
  const Turn = useSelector((state) => state.turn);
  const canControl = useSelector((state) => canHumanControl(state, props.playerId));
  const dispatch = useDispatch();

  const handleClick = (event) => {
    dispatch(playAction(props.className, { type: 'PASS' }));
  };

  return (
    <div className={`PlayerStatsUI ${props.className}`}>
      <h3>HP: {health}</h3>
      <h4>Mana: {mana}</h4>
      <h5>Tier: {tier}</h5>
      <p>Side Turn: {Turn.sideTurn}</p>
      {props.className == 'player1' ? <p>Stage: {Turn.stage}</p> : <p></p>}
      {canControl ? (
        <button onClick={handleClick}>Next Stage</button>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default PlayerStatsUI;
