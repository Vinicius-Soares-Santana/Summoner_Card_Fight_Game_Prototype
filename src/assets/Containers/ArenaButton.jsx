import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startCampaignBattle } from '../../Battle/battleActions';
import './ArenaButton.css';

function ArenaButton({ enemyId = 'goblinCaptain', difficulty }){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  function start() {
    const result = dispatch(startCampaignBattle(enemyId, difficulty));
    if (!result.ok) { setError(result.error); return; }
    setError('');
    navigate('/arena');
  }

  return <>
    <button onClick={start}>Arena</button>
    {error && <p role="alert">{error}</p>}
  </>;
}

export default ArenaButton;