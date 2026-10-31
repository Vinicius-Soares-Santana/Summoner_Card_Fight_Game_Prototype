import { CardsList } from './ActionConnections';

export const otherPlayer = (id) => { if(id === 'player1'){return 'player2'} else {return 'player1'}};
export const sideOf = (id) => `${id}side`;
export const handOf = (id) => `${id}hand`;
export const teamNames = (team) => Object.values(team).flat();

export function canHumanControl(state, playerId = state.turn.sideTurn){
  return state.battle?.status === 'playing' && !state.battle.resolving && state.turn.sideTurn === playerId && state.battle.participants[playerId]?.controller.type === 'human';
}


export function canSummon(state, playerId, name){
  const card = CardsList[name];
  const participant = state.battle.participants[playerId];
  const player = state.player[playerId];

  return Boolean(card && card.tier > 0 && teamNames(participant.team).includes(name) &&
    card.tier <= player.manaTier && card.manaCost <= player.mana && state.table[sideOf(playerId)].includes(null) &&
    !(card.tier === 3 && state.battle.usedTier3[playerId].includes(name)));
}


export function availableTargets(state, playerId, attackerId) {
  const position = state.table[sideOf(playerId)].indexOf(attackerId);
  const attacker = state.creatureCard[attackerId];

  if(position<0 || !attacker || ['paralised', 'paralysed'].includes(attacker.status)) return [];

  return state.table[sideOf(otherPlayer(playerId))].filter((id, index) => {
    const defender = state.creatureCard[id];
    return defender && defender.status !== 'protected' &&
      (attacker.aim > 3 || Math.abs(index - position) <= Math.floor(attacker.aim/2));
  });
}


export function validateAction(state, playerId, action){
  if (state.battle?.status !== 'playing' || state.battle.resolving) return false;
  if (state.turn.sideTurn !== playerId || !state.battle.participants[playerId]) return false;

  const stage = state.turn.stage;
  const player = state.player[playerId];

  switch (action.type) {
    case 'PASS':
      return ['initialState', 'Summon', 'Place', 'Attack', 'End'].includes(stage);
    case 'CHARGE':
      return ['initialState', 'End'].includes(stage) && Number.isInteger(action.amount) && action.amount > 0 && action.amount < player.health;
    case 'SUMMON':
      return stage === 'Summon' && canSummon(state, playerId, action.name);
    case 'PLACE':
      return stage === 'Place' && Number.isInteger(action.position) && action.position >= 0 && action.position < 4 && state.table[sideOf(playerId)][action.position] === null &&
                        state.hand[handOf(playerId)].includes(action.creatureId);
    case 'ATTACK': {
      if(stage !== 'Attack') return false;

      const attacker = state.creatureCard[action.attackerId];
      if(!attacker || !state.table[sideOf(playerId)].includes(action.attackerId) || ['paralised', 'paralysed'].includes(attacker.status)) return false;

      if (action.direct === true) {
        const enemyTable = state.table[sideOf(otherPlayer(playerId))];
      
        return enemyTable.every((id) => id === null) &&
          state.turn.turnCount > 2 * state.turn.allStages.length &&
          Array.isArray(action.targetIds) &&
          action.targetIds.length === 0;
      }
      
      const ids = action.targetIds;
      if(!Array.isArray(ids) || ids.length === 0 || ids.length > attacker.simultaneousAttackMax || new Set(ids).size !== ids.length) return false;
      const legal = availableTargets(state, playerId, action.attackerId);
      return ids.every((id) => legal.includes(id));
    }
    default:
      return false;
  }
}


export function getLegalActions(state, playerId) {
  if (state.battle?.status !== 'playing' || state.battle.resolving || state.turn.sideTurn !== playerId) return [];
  const actions = [{ type: 'PASS' }];
  const stage = state. turn.stage;

  if (stage === 'Summon') {
    for (const name of teamNames(state.battle.participants[playerId].team)){
      if (canSummon(state, playerId, name)) actions.push({ type: 'SUMMON', name });
    }
  }

  if (stage === 'Place') {
    for (const creatureId of state.hand[handOf(playerId)]) {
      state.table[sideOf(playerId)].forEach((id, position) => {
        if(id === null) actions.push({ type: 'PLACE', creatureId, position });
      });
    }
  }

  if (stage === 'Attack') {
    for (const attackerId of state.table[sideOf(playerId)].filter(Boolean)) {
      const direct = { type: 'ATTACK', attackerId, targetIds: [], direct: true };
      if (validateAction(state, playerId, direct)) actions.push(direct);

      const targets = availableTargets(state, playerId, attackerId);
      for (let mask = 1; mask < 2 ** targets.length; mask ++){
        const targetIds = targets.filter((_, index) => mask & (1 << index));
        const action = { type: 'ATTACK', attackerId, targetIds };
        if(validateAction(state, playerId, action)) actions.push(action);
      }
    }
  }

  return actions;
}
