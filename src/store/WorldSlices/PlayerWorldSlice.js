import { createSlice } from '@reduxjs/toolkit'

const initialState = {Health: 100,
                      Gold: 0,
                      Items: [],
                      availableCreatures: [],
                      selectedCreatures:{tier1:[], tier2:[], tier3:[]},
                      dialogScreen: {image: '', title: '', message:'', eventName:'', options:[], status: '', proceedStep: false, },
                    };

const PlayerWorldSlice = createSlice({
  name: 'playerWorld',
  initialState,
  reducers: {
    addSelectedCreature: (state, action) => {
      const tier = action.payload.creatureTier;
      const creatureName = action.payload.creatureName;

      if(Object.keys(state.selectedCreatures).includes(tier)){
        switch(tier){
          case 'tier1':
            if(state.selectedCreatures.tier1.length < 4 && !state.selectedCreatures.tier1.includes(creatureName)){
              state.selectedCreatures.tier1.push(creatureName);
            }
            break;

          case 'tier2':
            if(state.selectedCreatures.tier2.length < 3 && !state.selectedCreatures.tier2.includes(creatureName)){
              state.selectedCreatures.tier2.push(creatureName);
            }
            break;

          case 'tier3':
            if(state.selectedCreatures.tier3.length < 2 && !state.selectedCreatures.tier3.includes(creatureName)){
              state.selectedCreatures.tier3.push(creatureName);
            }
            break;

          default:
            break;
          
        }
      }
    },
    removeSelectedCreature: (state, action) => {
      const tier = action.payload.creatureTier;
      const creatureName = action.payload.creatureName;

      if(Object.keys(state.selectedCreatures).includes(tier)){
        switch(tier){
          case 'tier1':
            state.selectedCreatures.tier1 = state.selectedCreatures.tier1.filter((nameListed) => nameListed !== creatureName);
            break;
            
          case 'tier2':
            state.selectedCreatures.tier2 = state.selectedCreatures.tier2.filter((nameListed) => nameListed !== creatureName);
            break;

          case 'tier3':
            state.selectedCreatures.tier3 = state.selectedCreatures.tier3.filter((nameListed) => nameListed !== creatureName);
            break;

          default:
            break;
          
        }
      }
    },
    addAvailableCreature: (state, action) => {
      state.availableCreatures.push(action.payload.creatureName);
    },
    gainGold: (state, action) => {
      const goldEarned = action.payload;

      state.Gold += goldEarned;
    },
    spendGold: (state, action) => {
      const goldSpent = action.payload;
      if(state.Gold - goldSpent >= 0){
        state.Gold -= goldSpent;
      }
    },
    gainItem: (state, action) => {
      const ItemGained = action.payload;

      state.Items.push(ItemGained);
    },
    useItem: (state, action) => {
      const ItemIndex = state.Items.indexOf(action.payload);

      if(ItemIndex !== -1){
        state.Items.splice(ItemIndex, 1);
      }
    },
    changeDialog: (state, action) => {
      if(action.payload != null){
        let optionsArray = action.payload.options ?? [];
        if(optionsArray.length < 1) optionsArray = ['Ok'];
        
        state.dialogScreen = { 
          image: action.payload.image,
          title: action.payload.title, 
          message: action.payload.message, 
          eventName: action.payload.eventName, 
          options: optionsArray,
          status: action.payload.status, 
          proceedStep: action.payload.proceedStep,
        };

      } else {
        state.dialogScreen = { image: '', title: '', message: '', eventName:'', options: [], status: '', proceedStep: false};
      }
    }
  },
});

export const playerWorldActions = PlayerWorldSlice.actions;

export default PlayerWorldSlice.reducer;