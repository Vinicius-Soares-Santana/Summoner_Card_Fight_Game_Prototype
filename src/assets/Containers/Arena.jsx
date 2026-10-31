import react from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PlayerStatsUI from './PlayerStatsUI';
import CardHand from './CardHand';
import Table from './Table';
import SummonRelic from './SummonRelic';
import EffectManager from './EffectManager';
import AIController from '../../Battle/AIController';
import { cardSlotCursorActions } from '../../store/CardSlotCursor';
import { tableActions } from '../../store/TableSlice';
import { playerActions } from '../../store/PlayerSlice';
import { creatureCardActions } from '../../store/CreatureCardSlice';
import { handActions } from '../../store/HandSlice';
import { cardAttackCursorActions } from '../../store/CardAttackCursor';
import { TurnActions } from '../../store/TurnSlice';
import { stopBattle } from '../../Battle/battleActions';
import { cemeteryActions } from '../../store/CemeterySlice';
import { effectsActions } from '../../store/EffectsSlice';
import './Arena.css';

function Arena(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const battleType = useSelector((state) => state.battle.mode);
  const battleResultWinner = useSelector(
    (state) => state.battle.winner
  );
  const PlayersState = useSelector((state) => state.player);

  const { mana: player1Mana, health: player1Health } = PlayersState.player1;
  const { mana: player2Mana, health: player2Health } = PlayersState.player2;

  const onClick = (e) => {
    dispatch(cardSlotCursorActions.resetCardSlotCursor());
    dispatch(tableActions.resetTable());
    dispatch(creatureCardActions.resetCreatureCardSlice());
    dispatch(handActions.resetHand());
    dispatch(cardAttackCursorActions.resetCardAttackCursor());
    dispatch(TurnActions.resetTurn());
    dispatch(playerActions.resetOponent());
    //Remove reset player later
    dispatch(playerActions.resetPlayer());
    dispatch(cemeteryActions.resetCemetery());
    dispatch(effectsActions.resetEffects());
    dispatch(stopBattle());
    navigate('/');
  };

  if (battleResultWinner === 'player2') {
    dispatch(cardSlotCursorActions.resetCardSlotCursor());
    dispatch(tableActions.resetTable());
    dispatch(creatureCardActions.resetCreatureCardSlice());
    dispatch(handActions.resetHand());
    dispatch(cardAttackCursorActions.resetCardAttackCursor());
    dispatch(TurnActions.resetTurn());
    dispatch(cemeteryActions.resetCemetery());
    dispatch(effectsActions.resetEffects());
    return (
      <div className="player2Won">
        <h3>Player 2 Win!</h3>
        <button onClick={onClick}>Return to Main Menu</button>
      </div>
    );
  } else if (battleResultWinner === 'player1') {
    dispatch(cardSlotCursorActions.resetCardSlotCursor());
    dispatch(tableActions.resetTable());
    dispatch(creatureCardActions.resetCreatureCardSlice());
    dispatch(handActions.resetHand());
    dispatch(cardAttackCursorActions.resetCardAttackCursor());
    dispatch(TurnActions.resetTurn());
    dispatch(cemeteryActions.resetCemetery());
    dispatch(effectsActions.resetEffects());
    return (
      <div className="player1Won">
        <h3>Player 1 Win!</h3>
        <button onClick={onClick}>Return to Main Menu</button>
      </div>
    );
  } else if (battleResultWinner === 'draw') {
    dispatch(cardSlotCursorActions.resetCardSlotCursor());
    dispatch(tableActions.resetTable());
    dispatch(creatureCardActions.resetCreatureCardSlice());
    dispatch(handActions.resetHand());
    dispatch(cardAttackCursorActions.resetCardAttackCursor());
    dispatch(TurnActions.resetTurn());
    dispatch(cemeteryActions.resetCemetery());
    dispatch(effectsActions.resetEffects());
    return (
      <div className="draw">
        <h3>DRAW!</h3>
        <button onClick={onClick}>Return to Main Menu</button>
      </div>
    );
  } else {
    if (battleType == 'campaign') {

      return (
        <div id="Arena">
          <PlayerStatsUI className="player2" />
          <SummonRelic handToShow="player2hand" playerId="player2" />
          <CardHand handToShow="player2hand" playerId="player2" />
          <Table />
          <CardHand handToShow="player1hand" />
          <SummonRelic handToShow="player1hand" playerId="player1" />
          <PlayerStatsUI className="player1" />
          <AIController />
        </div>
      );

    } else {

      return (
        <div id="Arena">
          <PlayerStatsUI className="player2" />
          <SummonRelic handToShow="player2hand" playerId="player2" />
          <CardHand handToShow="player2hand" />
          <Table />
          <CardHand handToShow="player1hand" />
          <SummonRelic handToShow="player1hand" playerId="player1" />
          <PlayerStatsUI className="player1" />
          <AIController />
        </div>
      );

    }
  }
}

export default Arena;
