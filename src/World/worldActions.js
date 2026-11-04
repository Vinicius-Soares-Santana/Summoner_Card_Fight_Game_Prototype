import { CardsList, ItemsList, EffectsList, AllActions as A } from '../Battle/ActionConnections';
import { EnemiesList, DifficultyPresets } from '../assets/EnemiesList';

export function buyItem(item, itemType){
    return function (dispatch, getState){
        const state = getState();
        const playerGold = state.playerWorld.Gold;
        const shopAvailableItems = state.shop.itemsAvailable;
        let itemData = null;

        if(itemType == null || itemType == '' ) return;
        if(!shopAvailableItems.includes(item)) return;

        if(itemType == 'creature'){
            itemData = CardsList[item];
        }
        if(itemType == 'item'){
            itemData = ItemsList[item];
        }

        if(itemData?.price == null) return

        if(playerGold - itemData.price >= 0){
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

export function useItem(item, itemType){
    return function (dispatch, getState) {
        if(item == null || item == '') return
        if(itemType == null || itemType == '') return

        const state = getState();
        const playerCurrentItems = state.playerWorld.Items;
        let itemData = null;

        if(!playerCurrentItems.includes(item)) return

        if(itemType == 'item'){
            itemData = ItemsList[item];
            const effectName = itemData?.effect;
            const effectToUse = EffectsList[effectName];

            if (effectToUse == null) return;
            effectToUse.effect(A, dispatch, state);

            dispatch(A.playerWorldActions.useItem(item));
        }
    }
}