export const EnemiesList = {
  Acolite1: {
    id: 'Acolite1',
    name: 'Acolite',
    health: 50,
    difficulty: 'stupid',
    preferredGroups: ['Swarm', 'Scaling'],
    team: {
      tier1: ['Goblin', 'Slime', 'Gnome', 'Fluffy'],
      tier2: ['Fairy', 'Basilisk', 'Troll'],
      tier3: [],
    },
    goldLoot: 10,
    itemLoot: [],
  },
  goblinCaptain: {
    id: 'goblinCaptain',
    name: 'Goblin Captain',
    health: 70,
    difficulty: 'normal',
    preferredGroups: ['Swarm', 'Scaling', 'Aggressive'],
    team: {
      tier1: ['Goblin', 'Slime', 'Minion', 'Gnome'],
      tier2: ['Dragon', 'Fairy', 'Troll'],
      tier3: [],
    },
    goldLoot: 30,
    itemLoot: [],
  },
  ragnarokKeeper: {
    id: 'ragnarokKeeper',
    name: 'Ragnarok Keeper',
    health: 100,
    difficulty: 'hard',
    preferredGroups: ['Fortress', 'Sustain', 'Control'],
    team: {
      tier1: ['Paladin', 'Gnome', 'Archer', 'Minion'],
      tier2: ['Fairy', 'Basilisk', 'AncientDragon'],
      tier3: ['Fenrir', 'HolyKnight'],
    },
    goldLoot: 50,
    itemLoot: [],
  },
  TempleGuardian: {
    id: 'TempleGuardian',
    name: 'Temple Guardian',
    health: 100,
    difficulty: 'hard',
    preferredGroups: ['Graveyard', 'ManaEngine', 'Aggressive'],
    team: {
      tier1: ['Fluffy', 'Traitor', 'Lich', 'BabyDragon'],
      tier2: ['Fairy', 'Gashadokuro', 'Dragon'],
      tier3: ['SoulEater', 'DragonKing'],
    },
    goldLoot: 100,
    itemLoot: [],
  },
}

export const DifficultyPresets = {
  stupid:   { mistakeChance: 0.40, groupBonus: 1, minimumHealth: 40, delay: 900 },
  easy:   { mistakeChance: 0.30, groupBonus: 1, minimumHealth: 40, delay: 900 },
  normal: { mistakeChance: 0.15, groupBonus: 3, minimumHealth: 30, delay: 700 },
  hard: { mistakeChance: 0.1, groupBonus: 3, minimumHealth: 30, delay: 700 },
  nightmare:   { mistakeChance: 0.01,    groupBonus: 3, minimumHealth: 25, delay: 500 },
};