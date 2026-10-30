import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player1: [],
  player2: [],
};

const CemeterySlice = createSlice({
  name: 'cemetery',
  initialState,
  reducers: {
    addCreature: (state, action) => {
      state[action.payload.playerId].push(action.payload.creatureDestroyed);
    },
    removeCreature: (state, action) => {
      state[action.payload.playerId] = state[action.payload.playerId].filter(
        (creatureId) => creatureId != action.payload.creatureToRemove
      );
    },
    resetCemetery: (state, action) => {
      return initialState;
    },
  },
});

export const cemeteryActions = CemeterySlice.actions;

export default CemeterySlice.reducer;
