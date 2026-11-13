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
    goldLoot: 5,
    itemLoot: [],
  },

  fieldScout: {
    id: 'fieldScout',
    name: 'Field Scout',
    health: 50,
    difficulty: 'easy',
    preferredGroups: ['Aggressive'],
    team: {
      tier1: ['BabyDragon', 'Slime', 'Fluffy'],
      tier2: [],
      tier3: [],
    },
    goldLoot: 7,
    itemLoot: [],
  },

  goblinRecruiter: {
    id: 'goblinRecruiter',
    name: 'Goblin Recruiter',
    health: 55,
    difficulty: 'easy',
    preferredGroups: ['Swarm', 'Scaling'],
    team: {
      tier1: ['Goblin', 'Slime'],
      tier2: [],
      tier3: [],
    },
    goldLoot: 10,
    itemLoot: ['potion'],
  },

  fairyWarden: {
    id: 'fairyWarden',
    name: 'Fairy Warden',
    health: 60,
    difficulty: 'normal',
    preferredGroups: ['Fortress', 'Sustain'],
    team: {
      tier1: ['Goblin', 'Fluffy', 'Slime'],
      tier2: ['Fairy'],
      tier3: [],
    },
    goldLoot: 20,
    itemLoot: ['Fairy', 'potion'],
  },

  basiliskHandler: {
    id: 'basiliskHandler',
    name: 'Basilisk Handler',
    health: 65,
    difficulty: 'normal',
    preferredGroups: ['Control', 'Positioning'],
    team: {
      tier1: ['BabyDragon', 'Fluffy', 'Slime', 'Goblin'],
      tier2: ['Basilisk'],
      tier3: [],
    },
    goldLoot: 15,
    itemLoot: ['potion'],
  },

  cryptKeeper: {
    id: 'cryptKeeper',
    name: 'Crypt Keeper',
    health: 75,
    difficulty: 'hard',
    preferredGroups: ['Graveyard', 'DeathValue', 'ManaEngine'],
    team: {
      tier1: ['Slime', 'Traitor', 'Lich', 'Fluffy'],
      tier2: ['Gashadokuro'],
      tier3: [],
    },
    goldLoot: 15,
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