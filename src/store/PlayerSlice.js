import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player1: {
    health: 100,
    mana: 0,
    gold: 0,
    manaEnergyTotal: 0,
    manaTier: 1,
  },
  player2: {
    health: 100,
    mana: 0,
    gold: 0,
    manaEnergyTotal: 0,
    manaTier: 1,
  },
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    takeDamage: (state, action) => {
      state[action.payload.player].health -= action.payload.damage;
    },
    spendMana: (state, action) => {
      if (state[action.payload.player].mana - action.payload.manaSpent >= 0) {
        state[action.payload.player].mana -= action.payload.manaSpent;
      } else {
        state[action.payload.player].mana = 0;
      }
    },
    gainMana: (state, action) => {
      state[action.payload.player].mana += action.payload.manaGained;

      state[action.payload.player].manaTier = Math.max(1, Math.floor(
        (state[action.payload.player].manaEnergyTotal +
          action.payload.manaGained) /
          35
      ));
      
      state[action.payload.player].manaEnergyTotal += action.payload.manaGained;
    },
    resetOponent: (state, action) => {
      state.player2 = {
        health: 100,
        mana: 0,
        gold: 0,
        manaEnergyTotal: 0,
        manaTier: 1,
      };
    },
    resetPlayer: (state, action) => {
      state.player1 = {
        health: 100,
        mana: 0,
        gold: 0,
        manaEnergyTotal: 0,
        manaTier: 1,
      };
    },
    healPlayer: (state, action) => {
      state[action.payload.player].health += action.payload.healAmount;
    },
  },
});

export const playerActions = playerSlice.actions;

export default playerSlice.reducer;
