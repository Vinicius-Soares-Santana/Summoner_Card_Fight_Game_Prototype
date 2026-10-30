import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  player1side: [null, null, null, null],
  player2side: [null, null, null, null],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const tableside = action.payload.tableside;
      const SpacePlaced = action.payload.space;

      state[tableside][SpacePlaced] = action.payload.creatureId;
    },
    removeCard: (state, action) => {
      const tableside = action.payload.tableside;
      const SpacePlaced = parseInt(action.payload.space);

      state[tableside][SpacePlaced] = null;
    },
    removeCardById: (state, action) => {
      state.player1side = state.player1side.map((slotId) =>
        slotId === action.payload.monsterId ? null : slotId
      );
      state.player2side = state.player2side.map((slotId) =>
        slotId === action.payload.monsterId ? null : slotId
      );
    },
    resetTable: (state, action) => {
      return initialState;
    },
  },
});

export const tableActions = tableSlice.actions;

export default tableSlice.reducer;
