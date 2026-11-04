import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    ShopLevel: 1,
    itemsAvailable: ['Goblin', 'Traitor', 'Lich'],
    itemsToAddPerLevel: {
        2:['Minion', 'Mimic', 'Paladin'],
        3:['Archer', 'Raider', 'Gnome']
    },
};

const ShopSlice = createSlice({
  name: 'Shop',
  initialState,
  reducers: {
    removeItem: (state, action) => {
        const itemToRemove = action.payload;

        const itemIndex = state.itemsAvailable.indexOf(itemToRemove);

        if(itemIndex != -1){
            state.itemsAvailable.splice(itemIndex, 1);
        }
    },
    addItem: (state, action) => {
        const itemToAdd = action.payload;

        state.itemsAvailable.push(itemToAdd);

    },
    upgradeLevel: (state, action) => {

        state.ShopLevel += 1;

    },
  },
});

export const ShopActions = ShopSlice.actions;

export default ShopSlice.reducer;
