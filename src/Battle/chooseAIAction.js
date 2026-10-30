import { CardsList } from './ActionConnections';
import { EnemiesList, DifficultyPresets } from '../assets/EnemiesList';
import { getLegalActions, validateAction, sideOf, otherPlayer, teamNames } from './battleRules';
import { playAction } from './battleActions';

function scoreAction(state, playerId, action, enemy, profile) {
  const mine = state.player[playerId];
  const opponent = otherPlayer(playerId);
  const enemyHP = state.player[opponent].health;
  const allies = state.table[sideOf(playerId)].map((id) => state.creatureCard[id]);
  const enemies = state.table[sideOf(opponent)].map((id) => state.creatureCard[id]);
  if (action.type === 'PASS') return 0;
  if(action.type === 'CHARGE') return action.amount * 0.5 + 2;

  if (action.type === 'SUMMON') {
    const c = CardsList[action.name];
    const preference = (c.group ?? []).filter((g) => enemy.preferredGroups.includes(g)).length;
    let score = 5 + c.cardAttack + c.cardLife * c.cardDefense / 6 - c.manaCost / 5;
    score += preference * profile.groupBonus;
    if (c.name === 'Goblin') score += allies.filter((a) => a?.name === 'Goblin').length * 8;
    if (c.name === 'Paladin') score += allies.filter((a) => a && a.cardDeffense < 3).length * 5;
    if (c.name === 'Fairy') score += allies.filter((a) => a?.status === 'normal').length * 3;
    if (c.name === 'KingOfSpades') {
      score += (mine.health + mine.mana - c.manaCost) / 2;
      if (enemies.some((e) => e && e.cardAttack / c.cardDeffense >= c.cardLife)) score -= 35;
    }
    if (c.name === 'Fenrir') score += mine.health >= enemyHP ? 15 : -15;
    return score;
  }

  if (action.type === 'PLACE') {
    const c = state.creatureCard[action.creatureId];
    const pos  = action.position;
    let score = 5;
    const left = allies[pos - 1];
    const right = allies[pos + 1];
    const front = enemies[pos];
    for (const neighbor of [left, right].filter(Boolean)) {
      if (neighbor.name === 'Paladin' && c.cardDeffense < 3) score += 12;
      if (c.name === 'Paladin' && neighbor.cardDefense < 3) score += 12;
      if (c.name === 'Fairy' && neighbor.status === 'normal') score += 8;
      if (c.name === 'Traitor' && neighbor.status == 'normal') score -= 10;
    }
    if (front) {
      score += Math.min(c.cardAttack / front.cardDefense, front.cardLife);
      if (front.cardAttack / c.cardDefense >= c.cardLife) score -= 8;
      if(['Basilisk', 'Hydra', 'Mimic', 'Raider'].includes(c.name)) score += 10;
    }
    return score;
  }

  if (action.type === 'ATTACK') {
    if (action.direct) return enemyHP <= 20 ? 10000 : 30;
    const attacker = state.creatureCard[action.attackerId];
    let score = 0;
    let deathCosts = 0;
    for (const id of action.targetIds) {
      const target = state.creatureCard[id];
      const damage = attacker.cardAttack / target.cardDefense;
      score += Math.min(damage, target.cardLife);
      if (damage < target.cardLife) continue;
      deathCosts += target.manaCost;
      score += 15 + target.manaCost * 2;
      if (target.name === 'Fenrir') score += 40;
      if (target.name === 'Crawler') score -= attacker.cardLife * attacker.cardDefense / 2;
      if (target.name === 'Hydra' && target.status === 'normal') score -= 15;
    }
    if (deathCosts >= enemyHP) score += 10000;
    return score;
  }
  return 0;
}

export function chooseAIAction(state, playerId, rng = Math.random) {
  const controller = state.battle?.participants[playerId]?.controller;
  if(controller?.type !== 'ai') return null;
  const enemy = EnemiesList[controller.enemyId];
  const profile = DifficultyPresets[controller.difficulty];
  const actions = getLegalActions(state, playerId);
  if (actions.length === 0) return null;

  if(['initialState', 'End'].includes(state.turn.stage) && state.table[sideOf(playerId)].includes(null)){
    const player = state.player[playerId];
    const names = teamNames(state.battle.participants[playerId].team).filter((name) => CardsList[name].tier <= player.manaTier && !(CardsList[name].tier === 3 && state.battle.usedTier3[playerId].includes(name)));
    if (names.length){
      const cheapest = Math.min(...names.map((name) => CardsList[name].manaCost));
      const goal = Math.max(cheapest, player.manaTier >= 2 ? 20 : 10);
      const amount = Math.max(0, Math.floor(Math.min(
        goal - player.mana, player.health - profile.minimumHealth,
      )));
      const charge = { type: 'CHARGE', amount };
      if (validateAction(state, playerId, charge)) actions.push(charge);
    }
  }

  if (rng() < profile.mistakeChance) return actions[Math.floor(rng() * actions.length)];
  let best = actions[0];
  let bestScore = -Infinity;
  for (const action of actions){
    const score = scoreAction(state, playerId, action, enemy, profile);
    if (score > bestScore) { best = action; bestScore = score; }
  }
  return best
}

export const runAIStep = (ticket) => (dispatch, getState) => {
  const state = getState();
  if (state.battle.id !== ticket.id || state.battle.revision !== ticket.revision || state.battle.status !== 'playing' || state.battle.resolving) return;
  const playerId = state.turn.sideTurn;
  const action = chooseAIAction(state, playerId);
  if (action) return dispatch(playAction(playerId, action, ticket));
}