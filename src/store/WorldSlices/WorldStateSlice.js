import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentWorldStage: 'beggining',
    worldEvents: { 
        template: {
            status: '',
            optionsChosen:{optionsCounter: 'choice'},
            eventStep: 0,
            branch: '',
            optionsCounter: 1,
        },
    },
    quests: {'QuestTest': 'active',},
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
            state.worldEvents = {...state.worldEvents, [eventName]: {status: 'started', optionsChosen:{}, eventStep: 0, branch: 'standard', optionsCounter: 1},}
        },
        changeEventStep: (state, action) => {
            const eventName = action.payload.eventName;
            const newStatus = action.payload.newStatus;
            const newBranch = action.payload.newBranch;
            const optionChosenNow = action.payload.option;

            if(!state.worldEvents[eventName]) return;
            if(newStatus){
                state.worldEvents[eventName].status = newStatus;
            }
            if(optionChosenNow && action.payload.proceedStep){
                const currentOptionsCounter = state.worldEvents[eventName].optionsCounter;
                state.worldEvents[eventName].optionsChosen = {...state.worldEvents[eventName]?.optionsChosen, [currentOptionsCounter]: optionChosenNow };
                state.worldEvents[eventName].optionsCounter += 1;
            }

            if(action.payload.proceedStep){
                state.worldEvents[eventName].eventStep += 1;
                if(newBranch != null && newBranch != undefined && newBranch != ''){
                    state.worldEvents[eventName].eventStep = 1;
                    state.worldEvents[eventName].branch = newBranch;
                } 
            }
            

        },
    },
});

export const worldStateActions = WorldStateSlice.actions;

export default WorldStateSlice.reducer;