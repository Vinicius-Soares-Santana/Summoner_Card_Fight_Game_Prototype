import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player1hand: [],
  player2hand: [],
};

const handSlice = createSlice({
  name: 'hand',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const handSide = action.payload.handSide;

      state[handSide].push(action.payload.creatureId);
    },
    removeCard: (state, action) => {
      const handSide = action.payload.handSide;

      state[handSide] = state[handSide].filter(
        (creature) => creature != action.payload.creatureId
      );
    },
    resetHand: (state, action) => {
      return initialState;
    }
  },
});

export const handActions = handSlice.actions;

export default handSlice.reducer;
