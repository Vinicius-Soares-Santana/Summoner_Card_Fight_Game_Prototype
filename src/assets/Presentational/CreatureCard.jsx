import react from 'react';
import { useSelector } from 'react-redux';
import { getCreatureImage } from '../CreatureImages';
import defaultImage from '../Images/PythonLoading.png';
import './CreatureCard.css';

function CreatureCard(props) {
  const creature = useSelector((state) => state.creatureCard[props.Creature]);

  if (props.Creature) {
    return (
      <div className="CreatureCard">
        <h4>{creature?.name}</h4>
        <img
            src={getCreatureImage(creature?.name, props.orientation) ?? defaultImage}
            alt={creature?.name ?? ''}
        />
        <p className="cardLife">{`Health: ${creature?.cardLife}`}</p>
        <p className="cardDefense">{`Defense: ${creature?.cardDefense}`}</p>
        <p className="cardAttack">{`Attack: ${creature?.cardAttack}`}</p>
        <p className="manaCost">{`Mana Cost: ${creature?.manaCost}`}</p>
        <p className="Status">{`Card Status: ${creature?.status}`}</p>
      </div>
    );
  } else {
    return <div className="CreatureCard Empty"></div>;
  }
}

export default CreatureCard;
