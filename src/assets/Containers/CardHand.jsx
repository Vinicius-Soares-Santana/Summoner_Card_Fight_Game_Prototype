import react from 'react';
import { useSelector } from 'react-redux';
import HandZone from './HandZone';
import './CardHand.css';

function CardHand(props) {
  const currentHand = useSelector((state) => state.hand[props.handToShow]);

  return (
    <div className={`CardHand ${props.handToShow}`}>
      {currentHand?.map((card) => {
        return <HandZone Creature={card} handToShow={props.handToShow} key={card} />;
      })}
    </div>
  );
}

export default CardHand;
