import NPC from '../../../NPC';
import './ProtectionMagicBook.css';

const ProtectionMagicBook = {
  id: 'ProtectionMagicBook',
  name: 'Protection Magic Book',

  dialogue: [
        "Protection Spells",
      "Protection spells can be split in different layers, using stasis magic to prevent something to pass through",
      'They can be broken by finding the base sigils and embedding them with entropy magic...',
      'If a sigil takes more than it can hold, it casts out every stone.',
      'The backlash falls on the one who placed the last stone, and grows stronger with every stone already there.',
      {
        text: 'Dealing with entropy magic not to summon life can be dificult, erratic and oftenly, dangerous.',
        status: 'idle',
        nextBranch: 'standard',
      },
    ],
};

export default function ProtectionMagicBook() {
  return <NPC character={red} />;
}