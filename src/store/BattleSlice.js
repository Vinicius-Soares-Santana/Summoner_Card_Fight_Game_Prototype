import react from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  status: 'idle',
  mode: 'campaign',
  revision: 0,
  resolving: false,
  participants: {},
  usedTier3: { player1: [], player2: [] },
  preparedPlayers: [],
  firstPlayer: 'player1',
  winner: null,
  error: null,
};

const BattleSlice = createSlice({
  name: 'battle',
  initialState, 
  reducers: {
    patch: (state, action) => {
      return {...state, ...action.payload};
    },
    stop: (state, action) => {
      return {...state, status: 'idle', resolving: false};
    },
  }
});

export const battleActions = BattleSlice.actions;

export default BattleSlice.reducer;