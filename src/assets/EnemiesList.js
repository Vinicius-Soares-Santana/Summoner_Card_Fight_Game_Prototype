export const EnemiesList = {
  Acolite1: {
    id: 'Acolite1',
    name: 'Acolite',
    health: 100,
    difficulty: 'stupid',
    preferredGroups: ['Swarm', 'Scaling'],
    team: {
      tier1: ['Goblin', 'Slime', 'Gnome', 'Fluffy'],
      tier2: ['Fairy', 'Basilisk', 'Troll'],
      tier3: ['DragonKing', 'SoulEater'],
    },
  },
  goblinCaptain: {
    id: 'goblinCaptain',
    name: 'Goblin Captain',
    health: 100,
    difficulty: 'normal',
    preferredGroups: ['Swarm', 'Scaling', 'Aggressive'],
    team: {
      tier1: ['Goblin', 'Slime', 'Minion', 'Gnome'],
      tier2: ['Dragon', 'Fairy', 'Troll'],
      tier3: ['Hydra', 'DragonKing'],
    },
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
  },
}

export const DifficultyPresets = {
  stupid:   { mistakeChance: 0.40, groupBonus: 1, minimumHealth: 40, delay: 900 },
  easy:   { mistakeChance: 0.30, groupBonus: 1, minimumHealth: 40, delay: 900 },
  normal: { mistakeChance: 0.15, groupBonus: 3, minimumHealth: 30, delay: 700 },
  average: { mistakeChance: 0.07, groupBonus: 3, minimumHealth: 30, delay: 700 },
  hard:   { mistakeChance: 0,    groupBonus: 3, minimumHealth: 25, delay: 500 },
};