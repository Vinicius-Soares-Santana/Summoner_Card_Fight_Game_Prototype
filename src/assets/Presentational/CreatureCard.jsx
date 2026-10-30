import react from 'react';
import { useSelector } from 'react-redux';
import './CreatureCard.css';

function CreatureCard(props) {
  const creature = useSelector((state) => state.creatureCard[props.Creature]);
  const defaultImage = '../Images/PythonLoading.png';

  if (props.Creature) {
    return (
      <div className="CreatureCard">
        <h4>{creature?.name}</h4>
        <img src={creature?.image ?? defaultImage} />
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
