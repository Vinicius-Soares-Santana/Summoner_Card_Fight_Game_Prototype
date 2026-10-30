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

import { EffectsList } from '../EffectsList';
import './EffectManager.css';

function EffectManager(props) {
  const Turn = useSelector((state) => state.turn);
  const effectsActive = useSelector((state) => state.effects);
  const dispatch = useDispatch();

  //Verify and applies effects when the exist
  if (effectsActive.effectsLine.length > 0) {
    console.log(JSON.stringify(effectsActive));
    effectsActive.effectsLine.forEach((effectInLine) => {
      const currentState = Store.getState();
      const CardEffectOwnerId = effectInLine.body.OwnerId;
      const PlayerSideID = effectInLine.body.PlayerSideID;
      const OwnerPositionID = effectInLine.body.OwnerPositionID;
      let ConditionResult = EffectsList[effectInLine.body.effect]?.condition(
        currentState,
        CardEffectOwnerId,
        PlayerSideID,
        OwnerPositionID
      );
      if (ConditionResult) {
        const AllActions = {
          cardSlotCursorActions,
          tableActions,
          playerActions,
          creatureCardActions,
          handActions,
          cardAttackCursorActions,
          TurnActions,
          effectsActions,
          cemeteryActions,
        };

        EffectsList[effectInLine.body.effect]?.effect(
          AllActions,
          dispatch,
          currentState,
          CardEffectOwnerId,
          PlayerSideID,
          OwnerPositionID
        );

        dispatch(effectsActions.removeEffect(effectInLine.LineId));
      }
    });
  }

  return <div className="EffectManager"></div>;
}

export default EffectManager;
