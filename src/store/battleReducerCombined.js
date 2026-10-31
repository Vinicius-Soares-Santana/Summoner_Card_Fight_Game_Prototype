import react from 'react';
import { combineReducers } from '@reduxjs/toolkit';
import { AllActions } from '../Battle/ActionConnections';

export function withBattleReducer(existingReducers){
  const combined = combineReducers({...existingReducers});

  return (state, action) => {


    if(action.type === 'battle/start') {
      const fresh = combined(undefined, {type: '@@battle/initial'});
      const next = { ...(state ?? fresh) };
      for (const key of ['player', 'table', 'creatureCard', 'hand', 'turn', 'effects', 'cemetery',
      'cardslotcursor', 'cardattackcursor',]) next[key] = fresh[key];

      for (const playerId of ['player1', 'player2']){
        next.player = {
          ...next.player,
          [playerId]: {
            ...fresh.player[playerId],
            health: action.payload.participants[playerId].health,
          },
        };
      }

      next.turn = {
        ...fresh.turn, stage: 'initialState', stageIndex: -1,
        sideTurn: action.payload.firstPlayer, turnCount: 0,
      };

      next.battle = {
        ...fresh.battle, ...action.payload, status: 'playing',
        usedTier3: { player1: [], player2: [] }, preparedPlayers: [],
      };

      return next;
    }


    if(action.type === 'battle/setTurn'){
      return { ...state, turn: { ...state.turn, ...action.payload } };
    }


    if(state && action.type === AllActions.playerActions.healPlayer.type){
      const { player: id, healAmount } = action.payload;

      return {
        ...state,
        player: { ...state.player, [id]: {
          ...state.player[id], health: state.player[id].health + healAmount,
        } }
      };

    }


    if(action.type === 'battle/finish' && state.battle.status === 'playing'){
      let next = {
        ...state,
        battle: { ...state.battle, status: 'finished', winner: action.payload, resolving: false},
      };

      if(state.battle.mode === 'campaign' && state.playerWorld) {
        next = { ...next, playerWorld: {
          ...state.playerWorld, Health: Math.max(1, state.player.player1.health),
        } };
      }

      return next;
    }


    return combined(state, action);
  };
}