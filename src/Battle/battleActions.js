import { CardsList, ItemsList, EffectsList, AllActions as A } from './ActionConnections';
import { EnemiesList, DifficultyPresets } from '../assets/EnemiesList';
import { otherPlayer, sideOf, handOf, validateAction, teamNames } from './battleRules'

const patchBattle = (payload) => ({ type: 'battle/patch', payload });
const copy = (value) => structuredClone(value);

function validTeam(team) {
  if (!team || Object.keys(team).length !== 3) return false;
  for (const [index, limit] of [4, 3, 2].entries()) {
    const tier = index + 1;
    const names = team[`tier${tier}`];
    if(!Array.isArray(names) || names.length > limit || new Set(names).size !== names.length
       || names.some((name) => CardsList[name]?.tier !== tier)) return false;
  }
  return team.tier1.length > 0;
}

export const startBattle = (config) => (dispatch) => {
  if (!['campaign', 'versus'].includes(config.mode)) return { ok: false, error: 'Invalid Mode' };
  if(config.firstPlayer && !['player1', 'player2'].includes(config.firstPlayer)) {
    return { ok: false, error: 'Invalid Initial Player' };
  }

  for (const id of ['player1', 'player2']) {
    const p = config.participants?.[id];
    if (!p || !Number.isFinite(p.health) || p.health <= 0 || !validTeam(p.team)) {
      return { ok: false, error: `verify the life and team of ${id}. Limits: 4 /3/ 2; And the minimum of 1 T1.` };
    }
    if(!['human', 'ai'].includes(p.controller?.type) || 
        (p.controller.type === 'ai' && (!EnemiesList[p.controller.enemyId] || !DifficultyPresets[p.controller.difficulty]))) {
      return { ok: false, error: `Invalid control for ${id}.` };
    }
  }
  dispatch({ type: 'battle/start', payload: {
    id: crypto.randomUUID(), mode:config.mode,
    firstPlayer: config.firstPlayer ?? 'player1', participants: copy(config.participants),
  }});
  return { ok: true };
}

export const startCampaignBattle = (enemyId, difficulty) => (dispatch, getState) => {
  const world = getState().playerWorld;
  const enemy = EnemiesList[enemyId];
  if(!world || !enemy) return { ok: false, error: 'Player or worlkd or enemy not found' };
  if(teamNames(world.selectedCreatures).some((name) => !world.availableCreatures.includes(name))) {
    return { ok: false, error: 'Team includes a creature that is not available yet.' }
  }
  return dispatch(startBattle({
    mode: 'campaign',
    participants: {
      player1: { health: world.Health, team: world.selectedCreatures, controller: { type: 'human' } },
      player2: { health: enemy.health, team: enemy.team,
        controller: { type: 'ai', enemyId, difficulty: difficulty ?? enemy.difficulty } },
    },
  }));
};

function emit(dispatch, creature, playerId, position, ending = false, extra = {}) {
  const effect = ending ? creature.cardEffectEnd : creature.cardEffectStart;
  if(!effect || effect.effect === 'NoEffect') return;
  dispatch(A.effectsActions.addEffect({
    ...effect, OwnerId: extra.id, PlayerSideID: sideOf(playerId),
    OwnerPositionID: position, ...extra,
  }));
}

function removeKilledCreature(dispatch, getState, id, killerId) {
  const state = getState();
  const creature = state.creatureCard[id];
  const playerId = state.table.player1side.includes(id) ? 'player1' : 'player2';
  const position = state.table[sideOf(playerId)].indexOf(id);
  if (!creature || position < 0) return;
  emit(dispatch, creature, playerId, position, true, {
    id, KillerId: killerId, ownerFullData: copy(creature),
  });
  dispatch(A.tableActions.removeCardById({ monsterId: id }));
  dispatch(A.creatureCardActions.removeCreature(id));
  dispatch(A.cemeteryActions.addCreature({ playerId, creatureDestroyed: id }));
  dispatch(A.playerActions.takeDamage({ player: playerId, damage: creature.manaCost }));
  dispatch(A.playerActions.gainMana({
    player:otherPlayer(playerId), manaGained: creature.manaCost,
  }));
}

function finishIfNeeded(dispatch, getState) {
  const { player, battle } = getState();
  if (battle.status === 'finished') return true;
  if (battle.status !== 'playing') return false;
  if (player.player1.health > 0 && player.player2.health > 0) return false;

  const winner =
    player.player1.health <= 0 && player.player2.health <= 0
      ? 'draw'
      : player.player1.health > 0
        ? 'player1'
        : 'player2';

  dispatch({ type: 'battle/finish', payload: winner });

  if (battle.mode === 'campaign' && winner === 'player1') {
    const enemyId = battle.participants.player2.controller.enemyId;
    const enemyData = EnemiesList[enemyId];

    dispatch(A.playerWorldActions.addEnemiesDefeated(enemyId));
    dispatch(A.playerWorldActions.gainGold(enemyData.goldLoot));

    for (const item of enemyData.itemLoot) {
      dispatch(A.playerWorldActions.gainItem(item));
    }
  }

  return true;
}

function resolveEffects(dispatch, getState) {
  const effectDispatch = (action) => {
    // Efeitos que geram criaturas também precisam de cópias do template.
    if (action.type === A.creatureCardActions.invokeCreature.type) {
      action = { ...action, payload: { ...action.payload, creature: copy(action.payload.creature) } };
    }
    return dispatch(action);
  };
  for (let round = 0; round < 100; round++) {
    let resolved = false;
    for (const entry of [...getState().effects.effectsLine]) {
      const state = getState();
      if (!state.effects.effectsLine.some((e) => e.LineId === entry.LineId)) continue;
      const b = entry.body;
      const effect = EffectsList[b.effect];
      if (!effect) throw new Error(`Effect not found: ${b.effect}`);
      if (!effect.condition(state, b.OwnerId, b.PlayerSideID, b.OwnerPositionID)) continue;

      const owner = b.PlayerSideID.includes('player1') ? 'player1' : 'player2';
      const corpse = state.cemetery[owner].at(-1);
      const blockedRevival = b.effect === 'UnDead' && corpse &&
        CardsList[corpse.split('-')[0]]?.tier === 3;
      if (!blockedRevival) {
        effect.effect(A, effectDispatch, state, b.OwnerId, b.PlayerSideID, b.OwnerPositionID);
      }
      dispatch(A.effectsActions.removeEffect(entry.LineId));
      resolved = true;

      if (b.effect === 'EndOfTheWorld' && finishIfNeeded(dispatch, getState)) return;
    }
    if (!resolved) return;
  }
  throw new Error('Effect is running in a loop, verify EffectList.');
}

function enterCurrentStage(dispatch, getState) {
  if (getState().turn.stage === 'End') {
    const ids = Object.values(getState().table).flat().filter(Boolean);
    for (const id of ids) {
      const card = getState().creatureCard[id];
      if (card?.status !== 'poisoned') continue;
      dispatch(A.creatureCardActions.changeLife({ idCreature: id, newLife: card.cardLife - 1 }));
      if (card.cardLife - 1 <= 0) removeKilledCreature(dispatch, getState, id, 'poison');
    }
  }
  resolveEffects(dispatch, getState);
  finishIfNeeded(dispatch, getState);
}

function advanceStage(dispatch, getState) {
  if (getState().battle.status !== 'playing') return;
  const state = getState();
  dispatch(A.cardAttackCursorActions.resetCardAttackCursor());
  dispatch(A.cardSlotCursorActions.resetCardSlotCursor());
  if (state.turn.stage === 'initialState') {
    const prepared = [...state.battle.preparedPlayers, state.turn.sideTurn];
    dispatch(patchBattle({ preparedPlayers: prepared }));
    dispatch({ type: 'battle/setTurn', payload: prepared.length === 1 ? {
      sideTurn: otherPlayer(state.turn.sideTurn),
    } : { sideTurn: state.battle.firstPlayer, stage: 'Summon', stageIndex: 0 } });
  } else {
    dispatch(A.TurnActions.NextStage());
  }
  enterCurrentStage(dispatch, getState);
}

export const playAction = (playerId, action, ticket) => (dispatch, getState) => {
  const state = getState();
  if(!validateAction(state, playerId, action)) return { ok: false, error: 'Invalid Action' };
  const type = state.battle.participants[playerId].controller.type;
  if(type === 'ai'){
    if(!ticket || ticket.id !== state.battle.id || ticket.revision !== state.battle.revision){
      return { ok: false, error: 'Old ticket or incorrect control'};
    }
  } else if(ticket) return { ok: false, error: 'This player is controlled by a human.' };

  dispatch(patchBattle({ resolving: true, revision: state.battle.revision + 1 }));
  try {
    if (action.type === 'PASS') {
      advanceStage(dispatch, getState);
    } else if (action.type === 'CHARGE') {
      dispatch(A.playerActions.takeDamage({ player: playerId, damage: action.amount }));
      dispatch(A.playerActions.gainMana({ player: playerId, manaGained: action.amount }));
      resolveEffects(dispatch, getState);
    } else if (action.type === 'SUMMON') {
      const card = copy(CardsList[action.name]);
      const id = `${card.name}-${crypto.randomUUID()}`;
      dispatch(A.playerActions.spendMana({ player: playerId, manaSpent: card.manaCost }));
      dispatch(A.creatureCardActions.invokeCreature({ id, creature: card }));
      dispatch(A.handActions.addCard({ handSide: handOf(playerId), creatureId: id }));
      if (card.tier === 3) {
        const used = getState().battle.usedTier3;
        dispatch(patchBattle({ usedTier3: { ...used, [playerId]: [...used[playerId], card.name] } }));
      }
      advanceStage(dispatch, getState);
    } else if (action.type === 'PLACE') {
      const card = getState().creatureCard[action.creatureId];
      dispatch(A.tableActions.addCard({
        creatureId: action.creatureId, tableside: sideOf(playerId), space: action.position,
      }));
      dispatch(A.handActions.removeCard({ handSide: handOf(playerId), creatureId: action.creatureId }));
      emit(dispatch, card, playerId, action.position, false, { id: action.creatureId });
      resolveEffects(dispatch, getState);
      if (!finishIfNeeded(dispatch, getState)) advanceStage(dispatch, getState);
    } else if (action.type === 'ATTACK') {
      const attacker = state.creatureCard[action.attackerId];
      if (action.direct) {
        dispatch(A.playerActions.takeDamage({ player: otherPlayer(playerId), damage: 20 }));
      } else {

        for (const id of action.targetIds) {
          const card = state.creatureCard[id];
          const newLife = card.cardLife - attacker.cardAttack / card.cardDefense;
          dispatch(A.creatureCardActions.changeLife({ idCreature: id, newLife }));
          if (newLife <= 0) removeKilledCreature(dispatch, getState, id, action.attackerId);
        }
      }
      resolveEffects(dispatch, getState);
      if (!finishIfNeeded(dispatch, getState)) advanceStage(dispatch, getState);
    }
    finishIfNeeded(dispatch, getState);
    dispatch(patchBattle({ resolving: false }));
    return { ok: true };
  } catch (error) {
    dispatch(patchBattle({ status: 'error', resolving: false, error: error.message }));
    return { ok: false, error: error.message };
  }
};

export const stopBattle = () => ({ type: 'battle/stop' });