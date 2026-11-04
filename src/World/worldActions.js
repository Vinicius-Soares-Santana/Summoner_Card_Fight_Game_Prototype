import { CardsList, ItemsList, EffectsList, AllActions as A } from '../Battle/ActionConnections';
import { EnemiesList, DifficultyPresets } from '../assets/EnemiesList';

export function buyItem(item){
    return function (dispatch, getState){
        const state = getState();
        const playerGold = state.playerWorld.Gold;
        const shopAvailableItems = state.shop.itemsAvailable;
        let itemData = CardsList[item] ?? ItemsList[item];

        if(itemData == null || itemData == '' ) return;
        if(!shopAvailableItems.includes(item)) return;

        let itemType = itemData.type;

        if(itemData?.price == null) return

        if(playerGold - itemData.price >= 0){
            if (itemType === 'creature' &&
                state.playerWorld.availableCreatures.includes(item)) {
                return;
            }

            dispatch(A.playerWorldActions.spendGold(itemData.price));
            if(itemType == 'item'){
                dispatch(A.playerWorldActions.gainItem(item));
            }
            if(itemType == 'creature'){
                dispatch(A.playerWorldActions.addAvailableCreature({creatureName: item}));
                dispatch(A.ShopActions.removeItem(item));
            } 
        }
    }
}


export function upgradeShop(level){
    return function (dispatch, getState) {
        const state = getState();
        const shopCurrentLevel = state.shop.ShopLevel;

        if(level === shopCurrentLevel + 1){
            const itemsToAdd = state.shop.itemsToAddPerLevel[level];
            if(itemsToAdd != null && itemsToAdd != []){
                for(const itemInList of itemsToAdd){
                    dispatch(A.ShopActions.addItem(itemInList));
                }
                dispatch(A.ShopActions.upgradeLevel());
            }
        }
    }
}

export function useItem(item){
    return function (dispatch, getState) {
        if(item == null || item == '') return

        const state = getState();
        const playerCurrentItems = state.playerWorld.Items;
        let itemData = ItemsList[item] ?? null;

        if(itemData == null || itemData == '' ) return;
        if(!playerCurrentItems.includes(item)) return

        
        const effectName = itemData?.effect;
        const effectToUse = EffectsList[effectName];

        if (effectToUse == null) return;
        const resultOfEffect = effectToUse.effect(A, dispatch, state);

        if (resultOfEffect) dispatch(A.playerWorldActions.removeItem(item));
    }
}