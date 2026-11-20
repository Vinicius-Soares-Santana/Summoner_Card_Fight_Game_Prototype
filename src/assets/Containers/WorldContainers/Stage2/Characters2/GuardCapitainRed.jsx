import NPC from '../../../NPC';
import './GuardCapitainRed.css';

const red = {
  id: 'GuardCapitainRed',
  name: 'Guard Captain Red',

  dialogue: {
    standard: [
        "YOU! You're still alive?",
      "You came all this way...",
      'Did you come here after the Paladin\'s rune?',
      'Even if you take it, your people will be long gone before you come back',
      'But rest assure...',
      {
        text: 'Your death won\'t be in vain, shall it become an entertainment for our king!',
        fight: '...',
      },
    ],
    CONGRATULATIONS: [
      {
        text: 'Impossible, how have you obtained such power...',
        options: ["Your incompetence"],
        status: 'complete',
      },
    ],
  },

  battle: {
    enemyId: 'GuardCapitainRed',
    difficulty: 'hard',
  },

  quest: {
    id: 'GuardCaptainRedBattle',
    objective: 'Defeat the Captain of the Red Guard.',
    reward: 'Dragon',
    completedBranch: 'CONGRATULATIONS',
  },
};

export default function GuardCapitainRed() {
  return <NPC character={red} />;
}