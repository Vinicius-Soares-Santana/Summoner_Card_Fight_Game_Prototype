import { createSlice } from '@reduxjs/toolkit'

const initialState = {Health: 100,
                      Gold: 0,
                      availableCreatures: [],
                      selectedCreatures:{tier1:[], tier2:[], tier3:[]},
                      dialogScreen: {image: '', title: '', message:''},
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
  },
});

export const playerWorldActions = PlayerWorldSlice.actions;

export default PlayerWorldSlice.reducer;