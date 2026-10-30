import { createSlice } from '@reduxjs/toolkit';

const initialState = { selected: null, side: null, active: false };

const CardSlotCursorSlice = createSlice({
  name: 'cardslotcursor',
  initialState,
  reducers: {
    toggleSelect: (state, action) => {
      if (state.active) {
        state.selected = null;
        state.side = null;
        state.active = false;
      } else {
        state.selected = action.payload.selected;
        state.side = action.payload.side;
        state.active = true;
      }
    },
    resetCardSlotCursor: (state, action) => {
      return initialState;
    },
  },
});

export const cardSlotCursorActions = CardSlotCursorSlice.actions;

export default CardSlotCursorSlice.reducer;
