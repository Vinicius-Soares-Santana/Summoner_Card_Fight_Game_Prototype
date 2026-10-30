import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const creatureCardSlice = createSlice({
  name: 'creatureCard',
  initialState,
  reducers: {
    invokeCreature: (state, action) => {
      state[action.payload.id] = action.payload.creature;
    },
    receiveDamage: (state, action) => {
      if (
        state[action.payload.idReceiver] &&
        state[action.payload.idAttacker]
      ) {
        state[action.payload.idReceiver].cardLife -=
          state[action.payload.idAttacker].cardAttack /
            state[action.payload.idReceiver].cardDefense;
      }
    },
    changeAttack: (state, action) => {
      state[action.payload.idCreature].cardAttack = action.payload.newAttack;
    },
    changeStatus: (state, action) => {
      state[action.payload.idCreature].status = action.payload.newStatus;
    },
    changeManaCost: (state, action) => {
      state[action.payload.idCreature].manaCost = action.payload.newManaCost;
    },
    changeDefense: (state, action) => {
      state[action.payload.idCreature].cardDefense = action.payload.newDefense;
    },
    changeLife: (state, action) => {
      state[action.payload.idCreature].cardLife = action.payload.newLife;
    },
    changeAim: (state, action) => {
      state[action.payload.idCreature].aim = action.payload.newAim;
    },
    changeSimultaneousAttackMax: (state, action) => {
      state[action.payload.idCreature].simultaneousAttackMax = action.payload.newSimultaneousAttackMax;
    },
    removeCreature: (state, action) => {
      delete state[action.payload];
    },
    resetCreatureCardSlice: (state, action) => {
      return initialState;
    },
  },
});

export const creatureCardActions = creatureCardSlice.actions;

export default creatureCardSlice.reducer;
