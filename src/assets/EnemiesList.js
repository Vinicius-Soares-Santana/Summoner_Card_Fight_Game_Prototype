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
    itemLoot: ['Potion'],
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
    itemLoot: ['Potion'],
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
    itemLoot: ['Potion'],
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
    itemLoot: ['Elixir'],
  },


  templeLookout: {
    id: 'templeLookout', name: 'Temple Lookout',
    health: 55, difficulty: 'easy',
    preferredGroups: ['Aggressive'],
    team: { tier1: ['Minion', 'BabyDragon'], tier2: ['Fairy'], tier3: [] },
    goldLoot: 9, itemLoot: [],
  },
  templeBroodkeeper: {
    id: 'templeBroodkeeper', name: 'Temple Broodkeeper',
    health: 60, difficulty: 'normal',
    preferredGroups: ['Swarm', 'Scaling'],
    team: { tier1: ['Goblin', 'Slime', 'BabyDragon'], tier2: ['Fairy'], tier3: [] },
    goldLoot: 12, itemLoot: [],
  },
  templeBulwark: {
    id: 'templeBulwark', name: 'Temple Bulwark',
    health: 66, difficulty: 'normal',
    preferredGroups: ['Sustain', 'Fortress'],
    team: { tier1: ['Paladin', 'Minion', 'Goblin'], tier2: ['Fairy'], tier3: [] },
    goldLoot: 14, itemLoot: [],
  },
  templeStoneEye: {
    id: 'templeStoneEye', name: 'Stone-Eye Guard',
    health: 68, difficulty: 'normal',
    preferredGroups: ['Control', 'Positioning', 'Aggressive'],
    team: { tier1: ['Minion', 'Slime', 'BabyDragon'], tier2: ['Basilisk'], tier3: [] },
    goldLoot: 15, itemLoot: [],
  },
  templeMirrorGuard: {
    id: 'templeMirrorGuard', name: 'Mirror Guard',
    health: 62, difficulty: 'normal',
    preferredGroups: ['Adaptive', 'Positioning', 'Control'],
    team: { tier1: ['Mimic', 'BabyDragon'], tier2: ['Basilisk', 'Fairy'], tier3: [] },
    goldLoot: 15, itemLoot: [],
  },
  templeLanternKeeper: {
    id: 'templeLanternKeeper', name: 'Lantern Keeper',
    health: 70, difficulty: 'normal',
    preferredGroups: ['Scaling', 'Sustain', 'Fortress'],
    team: { tier1: ['Fluffy', 'Paladin', 'BabyDragon'], tier2: ['Fairy'], tier3: [] },
    goldLoot: 16, itemLoot: ['Potion'],
  },
  templeGraveKeeper: {
    id: 'templeGraveKeeper', name: 'Temple Gravekeeper',
    health: 74, difficulty: 'normal',
    preferredGroups: ['Graveyard', 'DeathValue', 'Swarm'],
    team: { tier1: ['Lich', 'Slime', 'BabyDragon'], tier2: ['Gashadokuro'], tier3: [] },
    goldLoot: 18, itemLoot: [],
  },
  templeBloodTithe: {
    id: 'templeBloodTithe', name: 'Blood Tithe Guard',
    health: 78, difficulty: 'hard',
    preferredGroups: ['ManaEngine', 'DeathValue', 'Graveyard'],
    team: { tier1: ['Traitor', 'Minion', 'Slime'], tier2: ['Gashadokuro', 'Basilisk'], tier3: [] },
    goldLoot: 20, itemLoot: [],
  },
  templeSoulJailer: {
    id: 'templeSoulJailer', name: 'Soul Jailer',
    health: 84, difficulty: 'hard',
    preferredGroups: ['Graveyard', 'DeathValue', 'ManaEngine'],
    team: { tier1: ['Slime', 'Lich', 'Minion'], tier2: ['Gashadokuro', 'Basilisk'], tier3: ['SoulEater'] },
    goldLoot: 26, itemLoot: [],
  },
  templeRoyalCollector: {
    id: 'templeRoyalCollector', name: 'Royal Collector',
    health: 90, difficulty: 'hard',
    preferredGroups: ['ResourceDisruption', 'Fortress', 'Scaling'],
    team: { tier1: ['Goblin', 'Paladin', 'Minion'], tier2: ['Fairy', 'Basilisk'], tier3: ['DragonKing'] },
    goldLoot: 28, itemLoot: [],
  },

  GuardCapitainRed: {
    id: 'GuardCapitainRed', name: 'Guard Capitain Red',
    health: 120, difficulty: 'hard',
    preferredGroups: ['Aggressive', 'Fortress'],
    team: { tier1: ['BabyDragon', 'Paladin', 'Archer', 'Goblin'], tier2: ['Fairy', 'Dragon', 'AncientDragon'], tier3: [] },
    goldLoot: 35, itemLoot: ['Elixir'],
  },
  GuardCapitainBlue: {
    id: 'GuardCapitainBlue', name: 'Guard Capitain Blue',
    health: 120, difficulty: 'hard',
    preferredGroups: ['Fortress', 'Scaling', 'Graveyard'],
    team: { tier1: ['Traitor', 'Paladin', 'Fluffy', 'Goblin'], tier2: ['Troll', 'Fairy', 'Gashadokuro'], tier3: [] },
    goldLoot: 35, itemLoot: ['Elixir'],
  },
  



  King: {
    id: 'King',
    name: 'King',
    health: 250,
    difficulty: 'nightmare',
    preferredGroups: ['Graveyard', 'ManaEngine', 'Aggressive'],
    team: {
      tier1: ['Gnome', 'Archer', 'Lich', 'Raider'],
      tier2: ['Basilisk', 'Troll', 'Gashadokuro'],
      tier3: ['SoulEater', 'DragonKing', 'Hydra', 'HolyKnight', 'Fenrir', 'KingOfSpades'],
    },
    goldLoot: 200,
    breakLimit: true,
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