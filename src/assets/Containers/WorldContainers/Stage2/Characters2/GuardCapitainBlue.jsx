import NPC from '../../../NPC';
import './GuardCapitainBlue.css';

const blue = {
  id: 'GuardCapitainBlue',
  name: 'Guard Captain Blue',

  dialogue: {
    standard: [
        "Who are you?",
      "These vests...",
      'I see. My king must have spared your life in that vilage of snakes',
      'You seek revenge? You believe you have a chance?',
      'You would never survive a single touch of the King of Spades',
      {
        text: 'Your life shall become part of our king\'s power',
        fight: '...',
      },
    ],
    CONGRATULATIONS: [
      {
        text: 'What have you done, you will perish wh...',
        options: ["Your king is next"],
        status: 'complete',
      },
    ],
  },

  battle: {
    enemyId: 'GuardCapitainBlue',
    difficulty: 'normal',
  },

  quest: {
    id: 'GuardCaptainBlueBattle',
    objective: 'Defeat the Captain of the Blue Guard.',
    reward: 'Troll',
    completedBranch: 'CONGRATULATIONS',
  },
};

export default function GuardCapitainBlue() {
  return <NPC character={blue} />;
}