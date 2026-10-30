import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './PlayerSlice';
import creatureCardReducer from './CreatureCardSlice';
import tableSliceReducer from './TableSlice';
import cardSlotCursorReducer from './CardSlotCursor';
import tableReducer from './HandSlice';
import cardAttackCursorReducer from './CardAttackCursor';
import turnReducer from './TurnSlice';
import effectsReducer from './EffectsSlice';
import cemeteryReducer from './CemeterySlice';
import battleReducer from './BattleSlice';
import playerWorldReducer from './WorldSlices/PlayerWorldSlice';
import { withBattleReducer } from './battleReducerCombined';

export const Store = configureStore({
  reducer: withBattleReducer({
    player: playerReducer,
    creatureCard: creatureCardReducer,
    table: tableSliceReducer,
    cardslotcursor: cardSlotCursorReducer,
    hand: tableReducer,
    cardattackcursor: cardAttackCursorReducer,
    turn: turnReducer,
    effects: effectsReducer,
    cemetery: cemeteryReducer,
    playerWorld: playerWorldReducer,
    battle: battleReducer,
  }),
});
