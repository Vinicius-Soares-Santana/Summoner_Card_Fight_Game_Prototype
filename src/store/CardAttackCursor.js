import react from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attacker: null,
  position: 0,
  maxAim: 0,
  simultaneousAttackMax: 0,
  tableSide: '',
  damageFull: false,
  targets: [],
  damage: [],
  active: false,
};

const CardAttackCursorSlice = createSlice({
  name: 'CardAttackCursor',
  initialState,
  reducers: {
    addAttacker: (state, action) => {
      if (state.active == false) {
        const attackerAdded = action.payload.attacker;
        const position = action.payload.position;

        state.attacker = attackerAdded;
        state.position = position;
        state.maxAim = action.payload.maxAim;
        state.simultaneousAttackMax = action.payload.simultaneousAttackMax;
        state.tableSide = action.payload.tableSide;
        state.active = true;

        if (action.payload.maxAim > 1 && action.payload.maxAim <= 3) {
          const minimunRange = position - Math.floor(action.payload.maxAim / 2);
          const maximunRange = position + Math.ceil(action.payload.maxAim / 2);
          const targets = Array.from(
            { length: action.payload.maxAim },
            (_, i) => minimunRange + i
          );

          state.targets = targets;
        } else if(action.payload.maxAim > 3){
          state.targets = [0, 1, 2, 3];
        } else {
          state.targets = [position];
        }
      } else {
        return initialState;
      }
    },
    addDamage: (state, action) => {
      const currentDamage = state.damage;
      if (currentDamage.length < state.simultaneousAttackMax) {
        state.damage.push(action.payload.choosenTarget);
      }
      if (currentDamage.length + 1 >= state.simultaneousAttackMax) {
        state.damageFull = true;
      }
    },
    removeDamage: (state, action) => {
      state.damage = state.damage.filter(
        (creature) => creature != action.payload.choosenTarget
      );
    },
    resetCardAttackCursor: (state, action) => {
      return initialState;
    },
  },
});

export const cardAttackCursorActions = CardAttackCursorSlice.actions;

export default CardAttackCursorSlice.reducer;
