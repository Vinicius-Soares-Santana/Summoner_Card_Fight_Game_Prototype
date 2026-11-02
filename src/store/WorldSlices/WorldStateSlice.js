import { createSlice } from '@reduxjs/toolkit';

const initialState = {currentWorldStage: 'beggining',};

const WorldStateSlice = createSlice({
    name: 'worldState',
    initialState,
    reducers: {
        nextStage: (state, action) => {
            return {...state, currentWorldStage: action.payload};
        },
    },
});

export const worldStateActions = WorldStateSlice.actions;

export default WorldStateSlice.reducer;