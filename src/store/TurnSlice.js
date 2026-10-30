import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sideTurn: 'player1',
  turnCount: 0,
  stage: 'initialState',
  allStages: ['Summon', 'Place', 'Attack', 'End'],
  stageIndex: 3,
  poisonApplied: [],
};

const TurnSlice = createSlice({
  name: 'turn',
  initialState,
  reducers: {
    NextStage: (state, action) => {
      if (state.stageIndex < state.allStages.length - 1) {
        state.stageIndex += 1;
        state.stage = state.allStages[state.stageIndex];
      } else if (state.stageIndex == state.allStages.length - 1) {
        state.stageIndex = 0;
        state.stage = state.allStages[state.stageIndex];
        if (state.sideTurn == 'player1') {
          state.sideTurn = 'player2';
        } else if (state.sideTurn == 'player2') {
          state.sideTurn = 'player1';
        }
      }
      state.turnCount += 1;

      if (state.stage === 'End') {
        state.poisonApplied = [];
      }
    },
    resetTurn: (state, action) => {
      return initialState;
    },
    addPoisonApplied: (state, action) => {
      if (!state.poisonApplied.includes(action.payload.space)) {
        state.poisonApplied.push(action.payload.space);
      }
    },
    removePoisonApplied: (state, action) => {
      
      state.poisonApplied = state.poisonApplied.filter((spaceInc) => spaceInc !== action.payload.space);
    },
  },
});

export const TurnActions = TurnSlice.actions;

export default TurnSlice.reducer;
