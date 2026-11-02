import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentWorldStage: 'beggining',
    worldEvents: { 
        template: {
            status: '',
            optionsChosen:{step: 'choice'},
            eventStep: 0,
        },
    },
};

const WorldStateSlice = createSlice({
    name: 'worldState',
    initialState,
    reducers: {
        nextStage: (state, action) => {
            return {...state, currentWorldStage: action.payload};
        },
        addEvent: (state, action) => {
            const eventName = action.payload.eventName;
            state.worldEvents = {...state.worldEvents, [eventName]: {status: 'started', optionsChosen:{}, eventStep: 0,},}
        },
        changeEventStep: (state, action) => {
            const eventName = action.payload.eventName;
            const newStatus = action.payload.newStatus;
            const optionChosenNow = action.payload.option;

            if(!state.worldEvents[eventName]) return;
            if(newStatus){
                state.worldEvents[eventName].eventStatus = newStatus;
            }
            if(optionChosenNow){
                const currentEventStep = state.worldEvents[eventName]?.eventStep;
                state.worldEvents[eventName].optionsChosen = {...state.worldEvents[eventName]?.optionsChosen, [currentEventStep]: optionChosenNow };
            }

            state.worldEvents[eventName].eventStep += 1;

        },
    },
});

export const worldStateActions = WorldStateSlice.actions;

export default WorldStateSlice.reducer;