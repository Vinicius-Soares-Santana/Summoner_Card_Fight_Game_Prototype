import { createSlice } from '@reduxjs/toolkit';

const initialState = { effectsLine: [], counter: 0 };

const effectsSlice = createSlice({
  name: 'effects',
  initialState,
  reducers: {
    addEffect: (state, action) => {
      const newEffect = { LineId: state.counter, body: action.payload };
      const currentLine = state.effectsLine;

      return {
        ...state,
        effectsLine: [...currentLine, newEffect],
        counter: state.counter + 1,
      };
    },
    removeEffect: (state, action) => {
      return {
        ...state,
        effectsLine: state.effectsLine.filter(
          (effectInLine) => effectInLine.LineId !== action.payload
        ),
      };
    },
    resetEffects: (state, action) => {
      return initialState;
    },
  },
});

export const effectsActions = effectsSlice.actions;

export default effectsSlice.reducer;
