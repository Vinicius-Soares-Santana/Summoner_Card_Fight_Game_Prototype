import react from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handActions } from '../../store/HandSlice';
import { creatureCardActions } from '../../store/CreatureCardSlice';
import { TurnActions } from '../../store/TurnSlice';
import { playerActions } from '../../store/PlayerSlice';
import { CardsList } from '../CardsList';
import { canHumanControl } from '../../Battle/battleRules';
import { playAction } from '../../Battle/battleActions';
import './SummonRelic.css';

function SummonRelic(props) {
  const dispatch = useDispatch();
  const [showCreaturesSummon, setShowCreaturesSummon] = useState(false);
  const [creatureName, setCreatureName] = useState('');
  const [manaAmount, setManaAmount] = useState(0);
  const health = useSelector((state) => state.player[props.playerId].health);
  const mana = useSelector((state) => state.player[props.playerId].mana);
  const playerTier = useSelector((state) => state.player[props.playerId].manaTier);
  const Turn = useSelector((state) => state.turn);
  const canControl = useSelector((state) => canHumanControl(state, props.playerId));

  const currentSelection = useSelector(
    (state) => state.battle.participants[props.playerId]?.team
  );

  function chargeMana(event) {
    event.preventDefault();
    dispatch(playAction(props.playerId, { type: 'CHARGE', amount: Number(manaAmount) }));

    setManaAmount(0);
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(playAction(props.playerId, { type: 'SUMMON', name: creatureName}));

    setCreatureName('');
  }

  if(canControl){
    return (
      <div className={`SummonRelic ${props.handToShow} ${creatureName}`}>
        <h2>{`${props.handToShow}`}</h2>
        <form className="summonForm" onSubmit={handleSubmit}>
          <p>Summon Creature</p>

          <button className="SelectCreatureMenuShow" aria-expanded={showCreaturesSummon} onClick={() => setShowCreaturesSummon(true)}>{creatureName != '' ? creatureName : 'Select Creature'}</button>
          {showCreaturesSummon && 
            <div className='SelectedTeamSummon' >
              {Object.keys(currentSelection ?? {}).map(
                (tier) => <div className={`selectedSummon ${tier}`} key={tier} >
                  {currentSelection[tier].map(
                    (creatureNameMap) => 
                      {return <button type="button" aria-pressed={creatureName === creatureNameMap} className='creatureSelectedSummonButton' key={creatureNameMap} onClick={() => setCreatureName(creatureNameMap)} >
                          {creatureNameMap}
                        </button>})}
                      </div>)}
              <button className="SelectCreatureMenuBack" onClick={() => setShowCreaturesSummon(false)}>Back</button>
            </div>
            }
          
          <button type="submit" disabled={!canControl || !creatureName}>Summon</button>
        </form>
  
        <form className="chargeManaForm" onSubmit={chargeMana}>
          <label htmlFor={`chargeManaAmount${props.playerId}`}>Charge Mana</label>
          <input
            id={`chargeManaAmount${props.playerId}`}
            type="number"
            value={manaAmount}
            onChange={(e) => setManaAmount(Number(e.target.value))}
          />
          <button type="submit" disabled={!canControl}>Charge</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={`SummonRelic ${props.handToShow}`}>
        <h2>{`${props.handToShow}`}</h2>
        <form className="summonForm" onSubmit={handleSubmit}>
          <label htmlFor={`nameField${props.playerId}`}>Summon Creature</label>
          <input
            id={`nameField${props.playerId}`}
            type="text"
            value={creatureName}
            onChange={(e) => setCreatureName(e.target.value)}
          />
          <button type="submit" disabled={!canControl}>Summon</button>
        </form>
  
        <form className="chargeManaForm" onSubmit={chargeMana}>
          <label htmlFor={`chargeManaAmount${props.playerId}`}>Charge Mana</label>
          <input
            id={`chargeManaAmount${props.playerId}`}
            type="number"
            value={manaAmount}
            onChange={(e) => setManaAmount(Number(e.target.value))}
          />
          <button type="submit" disabled={!canControl}>Charge</button>
        </form>
      </div>
    );
  }

}

export default SummonRelic;
