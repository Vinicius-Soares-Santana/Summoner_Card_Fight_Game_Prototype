import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentWorldStage: 'beggining',
    fluffySacrificed: false,
    worldEvents: { 
        template: {
            status: '',
            optionsChosen:{optionsCounter: 'choice'},
            eventStep: 0,
            branch: '',
            optionsCounter: 1,
        },
    },
    quests: {'QuestTest': { name: 'QuestTest', questStatus: 'active', currentObjective: '',},},
    mazeMonsterPosition: null,
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
        addQuest: (state, action) => {
            const questName = action.payload.questName;
            const curentObjective = action.payload.currentObjective;

            if(Object.keys(state.quests).includes(questName)) return;

            state.quests = {...state.quests, [questName]: {name: questName, questStatus: 'active', currentObjective: curentObjective,}, }
        },
        changeQuestStatus: (state, action) => {
            const questName = action.payload.questName;
            const newStatus = action.payload.newQuestStatus;

            state.quests[questName].questStatus = newStatus;
        },
        changeQuestObjective: (state, action) => {
            const questName = action.payload.questName;
            const newObjective = action.payload.newQuestObjective;

            state.quests[questName].currentObjective = newObjective;
        },
        changeFluffySacrificed: (state, action) => {
            state.fluffySacrificed = true;
        },
        setMazeMonsterPositionWorld: (state, action) => {
            if(action.payload == null) return state.mazeMonsterPosition = null;
            state.mazeMonsterPosition = {x: action.payload.x, y: action.payload.y};
        },
    },
});

export const worldStateActions = WorldStateSlice.actions;

export default WorldStateSlice.reducer;