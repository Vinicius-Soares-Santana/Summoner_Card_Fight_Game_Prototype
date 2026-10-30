import react from 'react';
import { useNavigate } from 'react-router-dom';

function SelectCreaturesButton(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/selectcreatures');
  };

  return <button className="SelectCreaturesButton" onClick={handleClick}>Select Creatures</button>;
}

export default SelectCreaturesButton;
