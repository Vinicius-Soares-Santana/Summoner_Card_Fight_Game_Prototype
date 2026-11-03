import { CardsList } from '../assets/CardsList';
import { EffectsList } from '../assets/EffectsList';
import { playerActions } from '../store/PlayerSlice';
import { creatureCardActions } from '../store/CreatureCardSlice';
import { tableActions } from '../store/TableSlice';
import { handActions } from '../store/HandSlice';
import { TurnActions } from '../store/TurnSlice';
import { effectsActions } from '../store/EffectsSlice';
import { cemeteryActions } from '../store/CemeterySlice';
import { cardSlotCursorActions } from '../store/CardSlotCursor';
import { cardAttackCursorActions } from '../store/CardAttackCursor';
import { playerWorldActions } from '../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../store/WorldSlices/WorldStateSlice';
import { battleActions } from '../store/BattleSlice';
 
export { CardsList, EffectsList };

export const AllActions = { 
  playerActions, creatureCardActions, tableActions, handActions, TurnActions, 
  effectsActions, cemeteryActions, cardSlotCursorActions, cardAttackCursorActions, battleActions,
  playerWorldActions, worldStateActions
};


