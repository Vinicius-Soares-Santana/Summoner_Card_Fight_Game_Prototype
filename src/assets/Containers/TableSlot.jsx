import react from 'react';
import { Store } from '../../store/Store';
import { useSelector, useDispatch } from 'react-redux';
import { cardSlotCursorActions } from '../../store/CardSlotCursor';
import { tableActions } from '../../store/TableSlice';
import { playerActions } from '../../store/PlayerSlice';
import { creatureCardActions } from '../../store/CreatureCardSlice';
import { handActions } from '../../store/HandSlice';
import { cardAttackCursorActions } from '../../store/CardAttackCursor';
import { TurnActions } from '../../store/TurnSlice';
import { effectsActions } from '../../store/EffectsSlice';
import { cemeteryActions } from '../../store/CemeterySlice';
import CreatureCard from '../Presentational/CreatureCard';

import { playAction } from '../../Battle/battleActions';
import { EffectsList } from '../EffectsList';
import './TableSlot.css';

function TableSlot(props) {
  //Updates the creature in the current slot
  let creature = props.creature;
  const creatureStats = useSelector(
    (state) => state.creatureCard[props.creature]
  );
  const cardSelected = useSelector((state) => state.cardslotcursor);
  const cardsInGame = useSelector((state) => state.creatureCard);
  const attackCursor = useSelector((state) => state.cardattackcursor);
  // Defines the enemy player according to the slot's class
  let oponentPlayer;
  if (props.className.includes('player1')) {
    oponentPlayer = 'player2side';
  } else {
    oponentPlayer = 'player1side';
  }

  let playerId;
  if (props.className.includes('player1')) {
    playerId = 'player1';
  } else {
    playerId = 'player2';
  }

  const oponentTable = useSelector((state) => state.table[oponentPlayer]);

  const Turn = useSelector((state) => state.turn);
  const effectsActive = useSelector((state) => state.effects);
  const poisonApplicationStatus = useSelector((state) => state.turn.poisonApplied);

  const dispatch = useDispatch();

  //Includes classes for dynamic styling and player feedback
  let mutableClass = '';
  if (creature && creature === attackCursor.attacker) {
    mutableClass = 'Attacker';
  } else if (creature && attackCursor.damage.includes(creature)) {
    mutableClass = 'Target';
  } else if (
    creature &&
    attackCursor.targets.includes(props.space) &&
    props.className !== attackCursor.tableSide
  ) {
    mutableClass = 'PotentialTarget';
  }



  //Deals with Attack button, applies damage and kills creatures when necessary
  const handleClick = () => {
    dispatch(playAction(playerId, { 
      type: 'PLACE', creatureId: cardSelected.selected, position: props.space,
     }))
  };

  function handleClickSelectAttacker(action) {
    dispatch(
      cardAttackCursorActions.addAttacker({
        attacker: creature,
        position: props.space,
        tableSide: props.className,
        maxAim: creatureStats.aim,
        simultaneousAttackMax: creatureStats.simultaneousAttackMax,
      })
    );
  }

  function handleClickAttack(action) {
    dispatch(playAction(playerId, { 
      type: 'ATTACK', attackerId: attackCursor.attacker,
      targetIds: [...attackCursor.damage], direct: attackCursor.damage.length === 0,
     }));
  }

  function handleClickAim(action) {
    if (cardsInGame[creature].status != 'protected') {
      dispatch(cardAttackCursorActions.addDamage({ choosenTarget: creature }));
    }
  }

  function handleClickRemoveAim(action) {
    dispatch(cardAttackCursorActions.removeDamage({ choosenTarget: creature }));
  }

  //Button Creators for dinamic buttons on screen-----------

  const buttonCreatorAttack = (creatureTest) => {
    if (!creatureTest) {
      if (Turn.stage == 'Place' && props.className.includes(Turn.sideTurn)) {
        return <button onClick={handleClick}>Add Monster</button>;
      }
    } else {
      if (Turn.stage == 'Attack' && props.className.includes(Turn.sideTurn) && creatureStats.status != 'paralysed') {
        if (creatureTest == attackCursor.attacker) {
          return <button onClick={handleClickAttack}>Attack</button>;
        } else {
          return (
            <button onClick={handleClickSelectAttacker}>Select Attacker</button>
          );
        }
      }
    }
  };

  const buttonCreatorTarget = (creatureTest) => {
    if (creatureTest && attackCursor.damage.includes(creatureTest)) {
      return <button onClick={handleClickRemoveAim}>Remove Target</button>;
    } else if (
      creatureTest &&
      attackCursor.targets.includes(props.space) &&
      props.className != attackCursor.tableSide
    ) {
      return <button onClick={handleClickAim}>Aim</button>;
    }
  };

  return (
    <div className={`TableSlot ${props.className} ${mutableClass} ${cardsInGame[creature]?.status ?? ''}`}>
      {<CreatureCard Creature={creature} orientation="Horizontal" />}
      {buttonCreatorAttack(creature)}
      {buttonCreatorTarget(creature)}
    </div>
  );
}

export default TableSlot;
