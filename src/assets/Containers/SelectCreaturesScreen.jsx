import react from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';
import { CardsList } from '../CardsList';
import { EffectsList } from '../EffectsList';
import './SelectCreaturesScreen.css';

function SelectCreaturesScreen(props){
  const [creatureInDisplay, setCreatureInDisplay] = useState('');
  const creatureToDisplayData = CardsList[creatureInDisplay];

  const currentSelection = useSelector((state) => state.playerWorld.selectedCreatures);
  const availableCreatures = useSelector((state) => state.playerWorld.availableCreatures);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function SkillsDisplayer(creatureEffectData){
    if(creatureEffectData!= undefined && creatureEffectData != null){
      if(creatureEffectData.effect != 'NoEffect' && creatureEffectData.effectString != ''){
        return <p className='EffectDescription'>{EffectsList[creatureEffectData.effect]?.description}</p>;
      }
    }
  }

  function AddRemoveButtonCreator(currentSelection, creatureInDisplay, creatureToDisplayData){
    if(!creatureToDisplayData) return null;
    if(creatureToDisplayData?.tier > 0){
      let creatureAdded = false;
      Object.keys(currentSelection).forEach((tierGroup) => {if(currentSelection[tierGroup].some((creatureName) => creatureName === creatureInDisplay)){creatureAdded = true}});
      if(creatureAdded){
        return <button className='removeFromSelection' onClick={()=>dispatch(playerWorldActions.removeSelectedCreature({creatureTier: `tier${creatureToDisplayData.tier}`, creatureName: creatureInDisplay}))} >Remove Creature From Team</button>
      } else {
        return <button className='addToSelection' onClick={()=>dispatch(playerWorldActions.addSelectedCreature({creatureTier: `tier${creatureToDisplayData.tier}`, creatureName: creatureInDisplay}))} >Add Creature To Team</button>
      }
    } else {
      return;
    }
    
  }


  
  return  (<div className='SelectCreatureScreen' >

            <div className='SelectedTeam' >
              {Object.keys(currentSelection).map((tier) => <div className={`selected ${tier}`} key={tier} >{currentSelection[tier].map((creatureName) => {return <button aria-pressed={creatureInDisplay === creatureName} className='creatureSelectedButton' key={creatureName} onClick={() => setCreatureInDisplay(creatureName)} >{creatureName}</button>})}</div>)}
            </div>

            <section className='BrowseSection' >

              <div className='CreatureGrid' >
                {availableCreatures.map((creatureName) => {return <button aria-pressed={creatureInDisplay === creatureName} className='creatureGridButton' key={creatureName} onClick={() => setCreatureInDisplay(creatureName)} >{creatureName}</button>})}
              </div>

              <div className='CreatureDetailsDisplay' >
                <h3 className='Title'>{creatureToDisplayData?.name}</h3>
                <p className='groupes' >Groupes: {creatureToDisplayData?.group?.join(', ')|| 'None'}</p>
                <p className='ManaCost' >Mana Cost: {creatureToDisplayData?.manaCost}</p>
                <p className='Tier' >Tier: {creatureToDisplayData?.tier}</p>
                <p className='HP' >HP: {creatureToDisplayData?.cardLife}</p>
                <p className='Defense' >Defense: {creatureToDisplayData?.cardDefense}</p>
                <p className='Attack' >Attack: {creatureToDisplayData?.cardAttack}</p>
                <p className='Range' >Range: {creatureToDisplayData?.aim}</p>
                <p className='Max' >Max of Attacks/Turn: {creatureToDisplayData?.simultaneousAttackMax}</p>
                <h5 className='SkillsTitle' >Skills</h5>
                <h6>Placement Skill</h6>
                {SkillsDisplayer(creatureToDisplayData?.cardEffectStart)??'None'}
                <h6>Death Skill</h6>
                {SkillsDisplayer(creatureToDisplayData?.cardEffectEnd)??'None'}
                {AddRemoveButtonCreator(currentSelection, creatureInDisplay, creatureToDisplayData)}
              </div>

            </section>

            <button className="returnSelect" onClick={() => {navigate("/")}}>Return</button>

          </div>);
}

export default SelectCreaturesScreen;