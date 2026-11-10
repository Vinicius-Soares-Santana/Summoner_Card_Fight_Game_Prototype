import react from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { playerWorldActions } from '../../store/WorldSlices/PlayerWorldSlice';
import { CardsList } from '../CardsList';
import { EffectsList } from '../EffectsList';
import { ItemsList } from '../ItemsList';
import { useItem } from '../../World/worldActions';
import { getCreatureImage } from '../CreatureImages';
import './SelectCreaturesScreen.css';

function SelectCreaturesScreen(props){
  const [creatureInDisplay, setCreatureInDisplay] = useState('');
  const creatureToDisplayData = CardsList[creatureInDisplay];
  const creatureImage = getCreatureImage(creatureInDisplay);

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


  const ownedItems = useSelector((state) => state.playerWorld.Items);
  const itemCounts = {};

  for (const itemId of ownedItems) {
      itemCounts[itemId] = (itemCounts[itemId] ?? 0) + 1;
  }

  const inventoryIds = Object.keys(itemCounts);


  
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
                {creatureImage && (
                    <img
                        className="CreaturePreviewImage"
                        src={creatureImage}
                        alt={creatureInDisplay}
                    />
                )}
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

            <section className="CreatureInventory">
                <h3>Inventory</h3>

                {inventoryIds.length === 0 ? (
                    <p className="InventoryEmpty">Your bag is empty.</p>
                ) : (
                    <ul className="InventoryList">
                        {inventoryIds.map((itemId) => {
                            const item = ItemsList[itemId];
                            const effect = EffectsList[item?.effect];
                            const canUse =
                                item?.effect !== 'NoEffect' &&
                                typeof effect?.effect === 'function';

                            return (
                                <li className="InventoryRow" key={itemId}>
                                    <div>
                                        <strong>{item?.name ?? itemId}</strong>
                                        <span className="InventoryQuantity">
                                            ×{itemCounts[itemId]}
                                        </span>

                                        {canUse && effect.description && (
                                            <p className="InventoryDescription">
                                                {effect.description}
                                            </p>
                                        )}
                                    </div>

                                    {canUse ? (
                                        <button
                                            type="button"
                                            className="InventoryUseButton"
                                            onClick={() => dispatch(useItem(itemId))}
                                        >
                                            Use
                                        </button>
                                    ) : (
                                        <span className="InventoryNote">
                                            No usable effect
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>

            <button className="returnSelect" onClick={() => {navigate(-1)}}>Return</button>

          </div>);
}

export default SelectCreaturesScreen;