import react from 'react';
import './MainMenu.css';
import { useDispatch } from 'react-redux';
import { cardSlotCursorActions } from '../../store/CardSlotCursor';
import { tableActions } from '../../store/TableSlice';
import { playerActions } from '../../store/PlayerSlice';
import { creatureCardActions } from '../../store/CreatureCardSlice';
import { handActions } from '../../store/HandSlice';
import { cardAttackCursorActions } from '../../store/CardAttackCursor';
import { TurnActions } from '../../store/TurnSlice';
import Button from '../Presentational/Button';
import { useNavigate } from 'react-router-dom';

function MainMenu(props) {
  const navigate = useNavigate();
 

  const handleClickPlay = () => {
    navigate('/stage1main');
  };

  return (
    <div id="MainMenu">
      <Button
        className="PlayButton"
        HandleClick={handleClickPlay}
        ButtonText="Play"
      />
    </div>
  );
}

export default MainMenu;
