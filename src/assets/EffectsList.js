import { CardsList } from './CardsList';

export const EffectsList = {
  NoEffect: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      return true;
    },
    description: '',
  },

  GoblinOrdeActivate: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return currentState.turn.stage === 'End';
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const monstersInGame = currentState.creatureCard;
      const currentTable = currentState.table;
      const playerOwnerSide = PlayerSideID;

      let countOfGoblings = 0;
      currentTable[playerOwnerSide]?.forEach((monsterId) => {
        if (monsterId?.includes('Goblin')) {
          countOfGoblings = countOfGoblings + 1;
        }
      });

      if (countOfGoblings > 1) {
        currentTable[playerOwnerSide]?.forEach((monsterId) => {
          if (
            monsterId?.includes('Goblin') &&
            monstersInGame[monsterId]?.status != 'paralysed'
          ) {
            const newAttackCurrent = countOfGoblings * 5;

            dispatch(
              AllActions.creatureCardActions.changeAttack({
                idCreature: monsterId,
                newAttack: newAttackCurrent,
              })
            );
          }
        });
      } else {
        currentTable[playerOwnerSide]?.forEach((monsterId) => {
          if (
            monsterId?.includes('Goblin') &&
            monstersInGame[monsterId]?.status != 'paralysed'
          ) {
            dispatch(
              AllActions.creatureCardActions.changeAttack({
                idCreature: monsterId,
                newAttack: 5,
              })
            );
          }
        });
      }
    },
    description:
      'Restore Attack and gives 5 Attack bonus for each goblin at the field',
  },

  SlimeResidue: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const currentTable = currentState.table;
      const leftPosition = OwnerPositionID - 1;
      const rightPosition = OwnerPositionID + 1;

      const creatureSummoned = CardsList['MiniSlime'];

      let creatureId;
      if (OwnerPositionID != null) {
        if (currentTable[PlayerSideID][OwnerPositionID] == null) {
          let creatureId = `${creatureSummoned.name}-${Math.round(
            Math.random() * Math.random() * 10000,
            0
          )}`;
          dispatch(
            AllActions.creatureCardActions.invokeCreature({
              id: creatureId,
              creature: creatureSummoned,
            })
          );

          dispatch(
            AllActions.tableActions.addCard({
              creatureId: creatureId,
              tableside: PlayerSideID,
              space: OwnerPositionID,
            })
          );
        }

        if (leftPosition >= 0) {
          if (currentTable[PlayerSideID][leftPosition] == null) {
            creatureId = `${creatureSummoned.name}-${Math.round(
              Math.random() * Math.random() * 10000,
              0
            )}`;
            dispatch(
              AllActions.creatureCardActions.invokeCreature({
                id: creatureId,
                creature: creatureSummoned,
              })
            );

            dispatch(
              AllActions.tableActions.addCard({
                creatureId: creatureId,
                tableside: PlayerSideID,
                space: leftPosition,
              })
            );
          }
        }

        if (rightPosition < currentTable[PlayerSideID].length) {
          if (currentTable[PlayerSideID][rightPosition] == null) {
            creatureId = `${creatureSummoned.name}-${Math.round(
              Math.random() * Math.random() * 10000,
              0
            )}`;
            dispatch(
              AllActions.creatureCardActions.invokeCreature({
                id: creatureId,
                creature: creatureSummoned,
              })
            );

            dispatch(
              AllActions.tableActions.addCard({
                creatureId: creatureId,
                tableside: PlayerSideID,
                space: rightPosition,
              })
            );
          }
        }
      }
    },
    description:
      'Slime is divided into 3 smaller slimes after destroyed if there is enough space',
  },

  Parasitism: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      const currentTurn = currentState.turn.turnCount;

      let playerTurn;
      if (PlayerSideID.includes('player1')) {
        playerTurn = 'player1';
      } else {
        playerTurn = 'player2';
      }

      const alreadyActivated = currentState.effects.effectsLine.some(
        (effectInLine) =>
          effectInLine.body.effect === 'Parasitism' &&
          effectInLine.body.turnSent === currentTurn
      );

      return (
        currentState.turn.stage === 'End' &&
        currentState.turn.sideTurn === playerTurn &&
        !alreadyActivated
      );
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let playerOponent;
      if (PlayerSideID.includes('player1')) {
        playerOponent = 'player2';
      } else {
        playerOponent = 'player1';
      }

      let health = currentState.player[playerOponent]?.health;
      const manaAmount = 10;

      if (health > 10) {
        const amount = Math.min(manaAmount, health - 10);
        dispatch(
          AllActions.playerActions.takeDamage({
            player: playerOponent,
            damage: amount,
          })
        );
        dispatch(
          AllActions.playerActions.gainMana({
            player: playerOponent,
            manaGained: amount,
          })
        );

        const updatedLine = currentState.effects.effectsLine.filter(
          (effectsInLine) =>
            effectsInLine.body.effect === 'Parasitism' &&
            effectsInLine.body.OwnerId === CardEffectOwnerId &&
            effectsInLine.body.turnSent === currentState.turn.turnCount - 1
        );

        if (
          currentState.table[PlayerSideID]?.includes(CardEffectOwnerId) &&
          !updatedLine.some(
            (effectInLine) =>
              effectInLine.body.effect === 'Parasitism' &&
              effectInLine.body.turnSent === currentState.turn.turnCount
          )
        ) {
          dispatch(
            AllActions.effectsActions.addEffect({
              OwnerId: CardEffectOwnerId,
              PlayerSideID: PlayerSideID,
              OwnerPositionID: OwnerPositionID,
              effect: 'Parasitism',
              turnSent: currentState.turn.turnCount,
            })
          );
        }
      }
    },
    description:
      'Force enemy player to convert 10 HP into mana every turn until they reaches 10HP total, the effect is not cumulative per Parasite on the field',
  },

  Paralize: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const monstersInGame = currentState.creatureCard;
      const currentTurnNumber = currentState.turn.turnCount;
      const numberOfStages = currentState.turn.allStages.length;
      const cleanupTurn = currentTurnNumber + 3 * numberOfStages;

      let playerOponent;
      if (PlayerSideID.includes('player1')) {
        playerOponent = 'player2side';
      } else {
        playerOponent = 'player1side';
      }

      const currentTable = currentState.table[playerOponent];

      console.log(`Current Turn: ${currentTurnNumber}`);
      console.log(`Cleanup Turn: ${cleanupTurn}`);

      if (currentTable != null) {
        if (currentTable[OwnerPositionID] != null) {
          const attackCleanup =
            monstersInGame[currentTable[OwnerPositionID]].cardAttack ?? 0;

          dispatch(
            AllActions.creatureCardActions.changeAttack({
              idCreature: currentTable[OwnerPositionID],
              newAttack: 0,
            })
          );
          dispatch(
            AllActions.creatureCardActions.changeStatus({
              idCreature: currentTable[OwnerPositionID],
              newStatus: 'paralysed',
            })
          );
          dispatch(
            AllActions.effectsActions.addEffect({
              OwnerId: CardEffectOwnerId,
              PlayerSideID: PlayerSideID,
              OwnerPositionID: OwnerPositionID,
              effect: 'ParalizeCleanup',
              effectTurn: cleanupTurn,
              originalAttack: attackCleanup,
              creatureAffected: currentTable[OwnerPositionID],
            })
          );
        }
      }
    },
    description:
      'Basylisk paralises the creature in front of them temporarily, also blocking all attack buffs while paralysed',
  },

  ParalizeCleanup: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'ParalizeCleanup' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );

      const currentTurnNumber = currentState.turn.turnCount;

      let turnToActivate;
      if (thisEffectBody != null) {
        turnToActivate = thisEffectBody.body.effectTurn;
        console.log(parseInt(currentTurnNumber));
        console.log(turnToActivate);
      }

      return parseInt(turnToActivate) == currentTurnNumber;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'ParalizeCleanup' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );
      const creaturesInGame = currentState.creatureCard;

      let playerOponent;
      if (PlayerSideID.includes('player1')) {
        playerOponent = 'player2side';
      } else {
        playerOponent = 'player1side';
      }

      const currentTable = currentState.table[playerOponent];
      if (currentTable != null) {
        if (
          currentTable[OwnerPositionID] === thisEffectBody.body.creatureAffected
        ) {
          dispatch(
            AllActions.creatureCardActions.changeStatus({
              idCreature: currentTable[OwnerPositionID],
              newStatus: 'normal',
            })
          );
          dispatch(
            AllActions.creatureCardActions.changeAttack({
              idCreature: currentTable[OwnerPositionID],
              newAttack: thisEffectBody.body.originalAttack,
            })
          );
        }
      }
    },
    description: '',
  },

  GodParent: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const currentTurnNumber = currentState.turn.turnCount;
      const numberOfStages = currentState.turn.allStages.length;
      const cardsInGame = currentState.creatureCard;

      const cleanupTurn = currentTurnNumber + 2 * numberOfStages;

      const currentTable = currentState.table[PlayerSideID];
      const leftPosition = OwnerPositionID - 1;
      const rightPosition = OwnerPositionID + 1;

      let creatureLeftTarget = null;

      if (leftPosition >= 0) {
        creatureLeftTarget = currentTable[leftPosition];
      }

      let creatureRightTarget = null;

      if (rightPosition < currentTable.length) {
        creatureRightTarget = currentTable[rightPosition];
      }

      let creatureDataLeftStatus = null;

      if (cardsInGame[creatureLeftTarget] != null) {
        creatureDataLeftStatus = cardsInGame[creatureLeftTarget]?.status;
      }

      let creatureDataRightStatus = null;

      if (cardsInGame[creatureRightTarget] != null) {
        creatureDataRightStatus = cardsInGame[creatureRightTarget]?.status;
      }

      if (
        leftPosition >= 0 &&
        creatureLeftTarget != null &&
        creatureDataLeftStatus == 'normal'
      ) {
        dispatch(
          AllActions.creatureCardActions.changeStatus({
            idCreature: creatureLeftTarget,
            newStatus: 'protected',
          })
        );

        dispatch(
          AllActions.effectsActions.addEffect({
            OwnerId: CardEffectOwnerId,
            PlayerSideID: PlayerSideID,
            OwnerPositionID: OwnerPositionID,
            effect: 'GodParentCleanup',
            effectTurn: cleanupTurn,
            creatureAffectedId: creatureLeftTarget,
          })
        );
      } else if (
        rightPosition < currentTable.length &&
        creatureRightTarget != null &&
        creatureDataRightStatus == 'normal'
      ) {
        dispatch(
          AllActions.creatureCardActions.changeStatus({
            idCreature: creatureRightTarget,
            newStatus: 'protected',
          })
        );

        dispatch(
          AllActions.effectsActions.addEffect({
            OwnerId: CardEffectOwnerId,
            PlayerSideID: PlayerSideID,
            OwnerPositionID: OwnerPositionID,
            effect: 'GodParentCleanup',
            effectTurn: cleanupTurn,
            creatureAffectedId: creatureRightTarget,
          })
        );
      }
    },
    description:
      'Fairy protects the creature on their left and if no creature is available, the creature on their right for a number of turns; Blocked by paralisys',
  },

  GodParentCleanup: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'GodParentCleanup' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );

      const currentTurnNumber = currentState.turn.turnCount;

      let turnToActivate;
      if (thisEffectBody != null) {
        turnToActivate = thisEffectBody.body.effectTurn;
      }

      return parseInt(turnToActivate) == currentTurnNumber;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const creaturesInGame = currentState.creatureCard;
      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'GodParentCleanup' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );
      const currentTable = currentState.table[PlayerSideID];

      currentTable.forEach((creatureInTable) => {
        if (
          creatureInTable == thisEffectBody.body.creatureAffectedId &&
          creaturesInGame[creatureInTable].status === 'protected'
        ) {
          dispatch(
            AllActions.creatureCardActions.changeStatus({
              idCreature: creatureInTable,
              newStatus: 'normal',
            })
          );
        }
      });
    },
    description: '',
  },

  Pillage: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let playerOponent;
      let oponent;
      let ownerOfCreaturePlayer;
      if (PlayerSideID.includes('player1')) {
        playerOponent = 'player2side';
        oponent = 'player2';
        ownerOfCreaturePlayer = 'player1';
      } else {
        playerOponent = 'player1side';
        oponent = 'player1';
        ownerOfCreaturePlayer = 'player2';
      }

      const currentTable = currentState.table[playerOponent];
      const cardsInGame = currentState.creatureCard;

      if (currentTable[OwnerPositionID] != null) {
        if (cardsInGame[currentTable[OwnerPositionID]].status === 'normal') {
          const targetFound = cardsInGame[currentTable[OwnerPositionID]];
          const targetFoundId = currentTable[OwnerPositionID];
          dispatch(
            AllActions.playerActions.takeDamage({
              player: oponent,
              damage: targetFound.manaCost,
            })
          );
          dispatch(
            AllActions.playerActions.gainMana({
              player: ownerOfCreaturePlayer,
              manaGained: targetFound.manaCost,
            })
          );
          dispatch(
            AllActions.creatureCardActions.changeManaCost({
              idCreature: targetFoundId,
              newManaCost: 0,
            })
          );
        }
      }
    },
    description:
      'Raider steals the mana from the oponent in front of him in advance, dealing damage but not destroying the creature, only if creature is not afected by any statuses.',
  },

  FluffyFurry: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const currentTurnNumber = currentState.turn.turnCount;

      dispatch(
        AllActions.effectsActions.addEffect({
          OwnerId: CardEffectOwnerId,
          PlayerSideID: PlayerSideID,
          OwnerPositionID: OwnerPositionID,
          effect: 'FluffyFurryFinalApply',
          turnPlaced: currentTurnNumber,
        })
      );
    },
    description:
      'Fluffy gains strength and anger while on the field, if he survives 6 turns, he will turn into a Flurry',
  },

  FluffyFurryFinalApply: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'FluffyFurryFinalApply' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );

      const ActivationTurn = thisEffectBody.body.turnPlaced + 48;

      const currentTurnNumber = currentState.turn.turnCount;

      const currentTurnStage = currentState.turn.stage;

      let ownerOfCreaturePlayer;
      let playerSide;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
      }

      const cardsInGame = currentState.creatureCard;

      const currentTable = currentState.table[playerSide];

      return (
        currentTurnStage === 'Summon' && currentTurnNumber >= ActivationTurn
      );
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let playerSide;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
      }

      const cardsInGame = currentState.creatureCard;
      const currentTable = currentState.table[playerSide];

      let FluffyInGame = false;
      if (currentTable.some((CreatureId) => CreatureId === CardEffectOwnerId)) {
        FluffyInGame = true;
      }

      if (FluffyInGame) {
        dispatch(
          AllActions.creatureCardActions.removeCreature(CardEffectOwnerId)
        );

        dispatch(
          AllActions.tableActions.removeCardById({
            monsterId: CardEffectOwnerId,
          })
        );

        const creatureSummoned = CardsList['Flurry'];

        let creatureId = `${creatureSummoned.name}-${Math.round(
          Math.random() * Math.random() * 10000,
          0
        )}`;
        dispatch(
          AllActions.creatureCardActions.invokeCreature({
            id: creatureId,
            creature: creatureSummoned,
          })
        );

        dispatch(
          AllActions.tableActions.addCard({
            creatureId: creatureId,
            tableside: playerSide,
            space: OwnerPositionID,
          })
        );

        const effectToAdd = {
          ...creatureSummoned.cardEffectStart,
          OwnerPositionID: OwnerPositionID,
          PlayerSideID: PlayerSideID,
          OwnerId: creatureId,
        };

        dispatch(AllActions.effectsActions.addEffect(effectToAdd));
      } else {
        return;
      }
    },
    description: '',
  },

  KindHeart: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
      } else {
        ownerOfCreaturePlayer = 'player2';
      }
      dispatch(
        AllActions.playerActions.gainMana({
          player: ownerOfCreaturePlayer,
          manaGained: 3,
        })
      );
    },
    description: "Gain 3 of extra mana upon this card's death",
  },

  BraveHeart: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
      } else {
        ownerOfCreaturePlayer = 'player2';
      }
      dispatch(
        AllActions.playerActions.gainMana({
          player: ownerOfCreaturePlayer,
          manaGained: 6,
        })
      );
    },
    description: "Gain 6 of extra mana upon this card's death",
  },

  UnDead: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let playerSide;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
      }

      const PlayerCemetery = currentState.cemetery[ownerOfCreaturePlayer];
      const currentTablePlayerside = currentState.table[playerSide];

      if (PlayerCemetery.length > 0) {
        if (currentTablePlayerside.includes(null)) {
          let cemeteryCreatureFound = PlayerCemetery.at(-1);
          const emptyIndex = currentTablePlayerside.indexOf(null);
          const cemeteryCreatureName = cemeteryCreatureFound.split('-')[0];
          const creatureSummoned = CardsList[cemeteryCreatureName];

          if (creatureSummoned != null) {
            let creatureId = `${creatureSummoned.name}-${Math.round(
              Math.random() * Math.random() * 10000,
              0
            )}`;
            dispatch(
              AllActions.creatureCardActions.invokeCreature({
                id: creatureId,
                creature: creatureSummoned,
              })
            );

            dispatch(
              AllActions.creatureCardActions.changeAttack({
                idCreature: creatureId,
                newAttack: Math.max(
                  Math.round(creatureSummoned.cardAttack / 2),
                  3
                ),
              })
            );

            dispatch(
              AllActions.creatureCardActions.changeStatus({
                idCreature: creatureId,
                newStatus: 'dead',
              })
            );

            dispatch(
              AllActions.creatureCardActions.changeManaCost({
                idCreature: creatureId,
                newManaCost: Math.max(
                  Math.round(creatureSummoned.manaCost / 3),
                  3
                ),
              })
            );

            dispatch(
              AllActions.creatureCardActions.changeDefense({
                idCreature: creatureId,
                newDefense: Math.max(
                  Math.round(creatureSummoned.cardDefense / 2),
                  1
                ),
              })
            );

            dispatch(
              AllActions.creatureCardActions.changeLife({
                idCreature: creatureId,
                newLife: Math.max(Math.round(creatureSummoned.cardLife / 2), 4),
              })
            );

            dispatch(
              AllActions.cemeteryActions.removeCreature({
                playerId: ownerOfCreaturePlayer,
                creatureToRemove: cemeteryCreatureFound,
              })
            );

            dispatch(
              AllActions.tableActions.addCard({
                creatureId: creatureId,
                tableside: PlayerSideID,
                space: emptyIndex,
              })
            );
          }
        }
      }
    },
    description:
      'Lich brings the latest creature dead back to life in the first space available from left to right',
  },

  CemeteryKing: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let playerSide;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
      }

      const playersCemetery = currentState.cemetery[ownerOfCreaturePlayer];
      const numberOfDeadCreatures = playersCemetery.length;

      const newAttackImproved =
        currentState.creatureCard[CardEffectOwnerId].cardAttack +
        3 * numberOfDeadCreatures;

      const newManaCost =
        currentState.creatureCard[CardEffectOwnerId].manaCost +
        2 * numberOfDeadCreatures;

      dispatch(
        AllActions.creatureCardActions.changeAttack({
          idCreature: CardEffectOwnerId,
          newAttack: newAttackImproved,
        })
      );

      dispatch(
        AllActions.creatureCardActions.changeManaCost({
          idCreature: CardEffectOwnerId,
          newManaCost: newManaCost,
        })
      );
    },
    description:
      "Gashadokuro receives 3 attack points and 2 points of mana in it's cost for each creature that died in your side before his arrival.",
  },

  TreacherousScheme: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let playerSide;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
      }

      const cardsInGame = currentState.creatureCard;

      const currentTable = currentState.table[PlayerSideID];
      const leftPosition = OwnerPositionID - 1;
      const rightPosition = OwnerPositionID + 1;

      let creatureLeftTarget = null;
      let creatureDataLeftStatus = null;

      if (leftPosition >= 0) {
        creatureLeftTarget = currentTable[leftPosition];
        if (creatureLeftTarget != null) {
          creatureDataLeftStatus = cardsInGame[creatureLeftTarget].status;
        }
      }

      let creatureRightTarget = null;
      let creatureDataRightStatus = null;

      if (rightPosition < currentTable.length) {
        creatureRightTarget = currentTable[rightPosition];
        if (creatureRightTarget != null) {
          creatureDataRightStatus = cardsInGame[creatureRightTarget].status;
        }
      }

      let affectedCreature;

      if (
        leftPosition >= 0 &&
        creatureLeftTarget != null &&
        creatureDataLeftStatus == 'normal'
      ) {
        affectedCreature = cardsInGame[creatureLeftTarget];

        dispatch(
          AllActions.playerActions.gainMana({
            player: ownerOfCreaturePlayer,
            manaGained: affectedCreature.manaCost,
          })
        );

        dispatch(
          AllActions.playerActions.takeDamage({
            player: ownerOfCreaturePlayer,
            damage: Number(((affectedCreature.manaCost / 3) * 2).toFixed(2)),
          })
        );

        const effectToAdd = {
          ...cardsInGame[creatureLeftTarget].cardEffectEnd,
          OwnerPositionID: leftPosition,
          PlayerSideID: playerSide,
          OwnerId: creatureLeftTarget,
          KillerId: currentTable[OwnerPositionID],
          ownerFullData: affectedCreature,
        };

        dispatch(AllActions.effectsActions.addEffect(effectToAdd));

        dispatch(
          AllActions.cemeteryActions.addCreature({
            playerId: ownerOfCreaturePlayer,
            creatureDestroyed: creatureLeftTarget,
          })
        );

        dispatch(
          AllActions.creatureCardActions.removeCreature(creatureLeftTarget)
        );

        dispatch(
          AllActions.tableActions.removeCardById({
            monsterId: creatureLeftTarget,
          })
        );
      } else if (
        rightPosition < currentTable.length &&
        creatureRightTarget != null &&
        creatureDataRightStatus == 'normal'
      ) {
        affectedCreature = cardsInGame[creatureRightTarget];

        dispatch(
          AllActions.playerActions.gainMana({
            player: ownerOfCreaturePlayer,
            manaGained: affectedCreature.manaCost,
          })
        );

        dispatch(
          AllActions.playerActions.takeDamage({
            player: ownerOfCreaturePlayer,
            damage: Number(((affectedCreature.manaCost / 3) * 2).toFixed(2)),
          })
        );

        const effectToAdd = {
          ...cardsInGame[creatureRightTarget].cardEffectEnd,
          OwnerPositionID: rightPosition,
          PlayerSideID: playerSide,
          OwnerId: creatureRightTarget,
          KillerId: currentTable[OwnerPositionID],
          ownerFullData: affectedCreature,
        };

        dispatch(AllActions.effectsActions.addEffect(effectToAdd));

        dispatch(
          AllActions.cemeteryActions.addCreature({
            playerId: ownerOfCreaturePlayer,
            creatureDestroyed: creatureRightTarget,
          })
        );

        dispatch(
          AllActions.creatureCardActions.removeCreature(creatureRightTarget)
        );

        dispatch(
          AllActions.tableActions.removeCardById({
            monsterId: creatureRightTarget,
          })
        );
      }
    },
    description:
      'If a creature is beside the traitor when it is placed, He will kill it and send you back the mana if their status is normal.',
  },

  AnEyeForAnEye: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      // let EnemyPlayer;
      // let EnemyPlayerSide;
      // const cardsInGame = currentState.creatureCard;

      // if (PlayerSideID.includes('player1')) {
      //   EnemyPlayer = 'player2';
      //   EnemyPlayerSide = 'player2side';
      // } else {
      //   EnemyPlayer = 'player1';
      //   EnemyPlayerSide = 'player1side';
      // }

      const ThisEffectBody = currentState.effects.effectsLine.find(
        (Effect) =>
          Effect.body.effect === 'AnEyeForAnEye' &&
          Effect.body.OwnerId === CardEffectOwnerId
      )?.body;
      const KillerId = ThisEffectBody['KillerId'];

      //dispatch(AllActions.playerActions.takeDamage({ player: EnemyPlayer, damage: cardsInGame[KillerId].manaCost}));

      dispatch(AllActions.creatureCardActions.removeCreature(KillerId));

      dispatch(AllActions.tableActions.removeCardById({ monsterId: KillerId }));
    },
    description:
      "Crawler takes his killer with him to the depths, along with Mana, attributes and not adding him to the enemie's cemetery or activating death effects",
  },

  ChampionOfTheUnderdogs: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      let effectTurnPlaced = -1;

      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'ChampionOfTheUnderdogs' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );

      if (Object.keys(thisEffectBody.body).includes('turnPlaced')) {
        effectTurnPlaced = thisEffectBody.body.turnPlaced;
      }

      const currentTurnNumber = currentState.turn.turnCount;

      return (
        currentState.turn.stage === 'End' &&
        (effectTurnPlaced < 0 || currentTurnNumber != effectTurnPlaced)
      );
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let playerSide;
      let opponent;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
        opponent = 'player2';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
        opponent = 'player1';
      }

      const cardsInGame = currentState.creatureCard;

      const currentTable = currentState.table[playerSide];

      const leftPosition = OwnerPositionID - 1;
      const rightPosition = OwnerPositionID + 1;

      let creatureLeftTarget = null;
      let creatureDataLeft = null;
      let creatureLeftSourceInfo = null;

      if (leftPosition >= 0) {
        creatureLeftTarget = currentTable[leftPosition];
        if (creatureLeftTarget != null) {
          creatureDataLeft = cardsInGame[creatureLeftTarget];
          creatureLeftSourceInfo = CardsList[creatureDataLeft.name];
        }
      }

      let creatureRightTarget = null;
      let creatureDataRight = null;
      let creatureRightSourceInfo = null;

      if (rightPosition < currentTable.length) {
        creatureRightTarget = currentTable[rightPosition];
        if (creatureRightTarget != null) {
          creatureDataRight = cardsInGame[creatureRightTarget];
          creatureRightSourceInfo = CardsList[creatureDataRight.name];
        }
      }

      let PaladinInGame = false;
      if (currentTable.some((CreatureId) => CreatureId === CardEffectOwnerId)) {
        PaladinInGame = true;
      }

      let paladinRemainingLife = cardsInGame[CardEffectOwnerId]?.cardLife;

      if (PaladinInGame) {
        if (
          (creatureDataLeft?.cardDefense < 3 &&
            creatureDataLeft?.status != 'protected') ||
          (creatureDataRight?.cardDefense < 3 &&
            creatureDataRight?.status != 'protected')
        ) {
          dispatch(
            AllActions.creatureCardActions.changeStatus({
              idCreature: CardEffectOwnerId,
              newStatus: 'protected',
            })
          );

          if (
            creatureDataLeft?.cardDefense < 3 &&
            creatureDataLeft?.status != 'protected' &&
            creatureDataLeft != null &&
            creatureDataLeft != undefined
          ) {
            const lifePointsDifference =
              creatureLeftSourceInfo.cardLife - creatureDataLeft.cardLife;

            if (lifePointsDifference > 0) {
              dispatch(
                AllActions.creatureCardActions.changeLife({
                  idCreature: creatureLeftTarget,
                  newLife: creatureLeftSourceInfo.cardLife,
                })
              );

              paladinRemainingLife =
                paladinRemainingLife - lifePointsDifference;

              if (paladinRemainingLife > 0) {
                dispatch(
                  AllActions.creatureCardActions.changeLife({
                    idCreature: CardEffectOwnerId,
                    newLife: paladinRemainingLife,
                  })
                );
              } else {
                dispatch(
                  AllActions.creatureCardActions.changeStatus({
                    idCreature: CardEffectOwnerId,
                    newStatus: 'normal',
                  })
                );
                dispatch(
                  AllActions.cemeteryActions.addCreature({
                    playerId: ownerOfCreaturePlayer,
                    creatureDestroyed: CardEffectOwnerId,
                  })
                );

                dispatch(
                  AllActions.playerActions.takeDamage({
                    player: ownerOfCreaturePlayer,
                    damage: cardsInGame[CardEffectOwnerId].manaCost,
                  })
                );

                dispatch(
                  AllActions.playerActions.gainMana({
                    player: opponent,
                    manaGained: cardsInGame[CardEffectOwnerId].manaCost,
                  })
                );

                dispatch(
                  AllActions.creatureCardActions.removeCreature(
                    CardEffectOwnerId
                  )
                );

                dispatch(
                  AllActions.tableActions.removeCardById({
                    monsterId: CardEffectOwnerId,
                  })
                );
              }
            }
          }

          if (
            creatureDataRight?.cardDefense < 3 &&
            creatureDataRight?.status != 'protected' &&
            creatureDataRight != null &&
            creatureDataRight != undefined &&
            paladinRemainingLife > 0
          ) {
            const lifePointsDifference =
              creatureRightSourceInfo.cardLife - creatureDataRight.cardLife;

            if (lifePointsDifference > 0) {
              dispatch(
                AllActions.creatureCardActions.changeLife({
                  idCreature: creatureRightTarget,
                  newLife: creatureRightSourceInfo.cardLife,
                })
              );

              paladinRemainingLife =
                paladinRemainingLife - lifePointsDifference;

              if (paladinRemainingLife > 0) {
                dispatch(
                  AllActions.creatureCardActions.changeLife({
                    idCreature: CardEffectOwnerId,
                    newLife: paladinRemainingLife,
                  })
                );
              } else {
                dispatch(
                  AllActions.creatureCardActions.changeStatus({
                    idCreature: CardEffectOwnerId,
                    newStatus: 'normal',
                  })
                );
                dispatch(
                  AllActions.cemeteryActions.addCreature({
                    playerId: ownerOfCreaturePlayer,
                    creatureDestroyed: CardEffectOwnerId,
                  })
                );

                dispatch(
                  AllActions.playerActions.takeDamage({
                    player: ownerOfCreaturePlayer,
                    damage: cardsInGame[CardEffectOwnerId].manaCost,
                  })
                );

                dispatch(
                  AllActions.playerActions.gainMana({
                    player: opponent,
                    manaGained: cardsInGame[CardEffectOwnerId].manaCost,
                  })
                );

                dispatch(
                  AllActions.creatureCardActions.removeCreature(
                    CardEffectOwnerId
                  )
                );

                dispatch(
                  AllActions.tableActions.removeCardById({
                    monsterId: CardEffectOwnerId,
                  })
                );
              }
            }
          }
        } else if (cardsInGame[CardEffectOwnerId]?.status == 'protected') {
          dispatch(
            AllActions.creatureCardActions.changeStatus({
              idCreature: CardEffectOwnerId,
              newStatus: 'normal',
            })
          );
        }
      } else {
        return;
      }

      //Verifying if the effect already exists before including it again

      const currentTurnNumber = currentState.turn.turnCount;

      if (PaladinInGame && paladinRemainingLife > 0) {
        dispatch(
          AllActions.effectsActions.addEffect({
            OwnerId: CardEffectOwnerId,
            PlayerSideID: PlayerSideID,
            OwnerPositionID: OwnerPositionID,
            effect: 'ChampionOfTheUnderdogs',
            turnPlaced: currentTurnNumber,
          })
        );
      }
    },
    description:
      "If the cards besides Paladin in game have less than 2 defense and are unprotected, Paladin becomes protected and absorvs the non lethal damage those cards have taken until he dies. Paladin can't be protected in other ways",
  },

  GreedOfTheKing: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      let ownerOfCreaturePlayer;
      let playerSide;
      let opponent;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
        opponent = 'player2';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
        opponent = 'player1';
      }

      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'GreedOfTheKing' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );

      const effectTurnPlaced = thisEffectBody?.body?.turnPlaced ?? -1;

      const currentTurnNumber = currentState.turn.turnCount;
      const currentTurnPlayer = currentState.turn.sideTurn;

      return (
        currentState.turn.stage === 'End' &&
        currentTurnPlayer === ownerOfCreaturePlayer &&
        (effectTurnPlaced < 0 || currentTurnNumber != effectTurnPlaced)
      );
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let playerSide;
      let opponent;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
        opponent = 'player2';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
        opponent = 'player1';
      }

      const currentTable = currentState.table[playerSide];

      const cardsInGame = currentState.creatureCard;

      const opponentMana = currentState.player[opponent]?.mana;

      let DragonKingData = null;

      let DragonKingInGame = false;
      if (currentTable.some((CreatureId) => CreatureId === CardEffectOwnerId)) {
        DragonKingInGame = true;
        DragonKingData = cardsInGame[CardEffectOwnerId];
      }

      if (DragonKingInGame && DragonKingData.status === 'greedy') {
        if (opponentMana > 10) {
          dispatch(
            AllActions.playerActions.spendMana({
              player: opponent,
              manaSpent: 5,
            })
          );
          dispatch(
            AllActions.playerActions.gainMana({
              player: ownerOfCreaturePlayer,
              manaGained: 5,
            })
          );
          dispatch(
            AllActions.creatureCardActions.changeManaCost({
              idCreature: CardEffectOwnerId,
              newManaCost: DragonKingData.manaCost + 4,
            })
          );
          dispatch(
            AllActions.creatureCardActions.changeAttack({
              idCreature: CardEffectOwnerId,
              newAttack: DragonKingData.cardAttack + 3,
            })
          );
        }
      } else if (DragonKingInGame && DragonKingData.status === 'normal') {
        dispatch(
          AllActions.creatureCardActions.changeStatus({
            idCreature: CardEffectOwnerId,
            newStatus: 'greedy',
          })
        );
      }

      const currentTurnNumber = currentState.turn.turnCount;
      if (DragonKingInGame) {
        dispatch(
          AllActions.effectsActions.addEffect({
            OwnerId: CardEffectOwnerId,
            PlayerSideID: PlayerSideID,
            OwnerPositionID: OwnerPositionID,
            effect: 'GreedOfTheKing',
            turnPlaced: currentTurnNumber,
          })
        );
      }
    },
    description:
      "At the end of its owner's turn, if Greedy and the opponent has more than 10 mana, steals 5 mana, gains 3 Attack and increases its mana cost by 4.",
  },

  Feast: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let oponent;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        oponent = 'player2';
      } else {
        ownerOfCreaturePlayer = 'player2';
        oponent = 'player1';
      }

      const PlayerCemetery = currentState.cemetery[ownerOfCreaturePlayer];

      const PlayerOponentCemetery = currentState.cemetery[oponent];

      dispatch(
        AllActions.playerActions.gainMana({
          player: ownerOfCreaturePlayer,
          manaGained:
            (PlayerCemetery.length + PlayerOponentCemetery.length) * 5,
        })
      );

      dispatch(AllActions.cemeteryActions.resetCemetery());
    },
    description:
      'Gain 5 of mana for each creature in the cemeterys of both players, consuming them',
  },

  LuckyDay: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const ChancesAreChancing = Math.floor(Math.random() * 10) + 1;

      let ownerOfCreaturePlayer;
      let oponent;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        oponent = 'player2';
      } else {
        ownerOfCreaturePlayer = 'player2';
        oponent = 'player1';
      }

      if (ChancesAreChancing <= 5) {
        dispatch(
          AllActions.creatureCardActions.changeManaCost({
            idCreature: CardEffectOwnerId,
            newManaCost: 15,
          })
        );
      } else {
        dispatch(
          AllActions.playerActions.gainMana({
            player: ownerOfCreaturePlayer,
            manaGained: 15,
          })
        );
      }
    },
    description:
      "There's half a chance Gnome will give you 15 extra mana, or he will become 15 cost.",
  },

  Plagiarism: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const cardsInGame = currentState.creatureCard;

      let opponentSide;

      if (PlayerSideID.includes('player1')) {
        opponentSide = 'player2side';
      } else {
        opponentSide = 'player1side';
      }

      const currentTableEnemySide = currentState.table[opponentSide];

      let targetCreature;
      let targetId;

      if (
        currentTableEnemySide[OwnerPositionID] != null &&
        currentTableEnemySide[OwnerPositionID] != undefined
      ) {
        targetId = currentTableEnemySide[OwnerPositionID];
        targetCreature = cardsInGame[targetId];

        if (!targetCreature) return;

        dispatch(
          AllActions.creatureCardActions.changeAttack({
            idCreature: CardEffectOwnerId,
            newAttack: targetCreature.cardAttack,
          })
        );
        dispatch(
          AllActions.creatureCardActions.changeManaCost({
            idCreature: CardEffectOwnerId,
            newManaCost: targetCreature.manaCost,
          })
        );
        dispatch(
          AllActions.creatureCardActions.changeDefense({
            idCreature: CardEffectOwnerId,
            newDefense: targetCreature.cardDefense,
          })
        );
        dispatch(
          AllActions.creatureCardActions.changeLife({
            idCreature: CardEffectOwnerId,
            newLife: targetCreature.cardLife,
          })
        );
        dispatch(
          AllActions.creatureCardActions.changeAim({
            idCreature: CardEffectOwnerId,
            newAim: targetCreature.aim,
          })
        );
        dispatch(
          AllActions.creatureCardActions.changeSimultaneousAttackMax({
            idCreature: CardEffectOwnerId,
            newSimultaneousAttackMax: targetCreature.simultaneousAttackMax,
          })
        );
      }
    },
    description:
      'Mimic Copies all the current attributes of the creature in front of him, except effects and status.',
  },

  Poison: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const cardsInGame = currentState.creatureCard;

      let opponentSide;

      if (PlayerSideID.includes('player1')) {
        opponentSide = 'player2side';
      } else {
        opponentSide = 'player1side';
      }

      const currentTableEnemySide = currentState.table[opponentSide];

      let targetId;

      if (
        currentTableEnemySide[OwnerPositionID] != null &&
        currentTableEnemySide[OwnerPositionID] != undefined
      ) {
        targetId = currentTableEnemySide[OwnerPositionID];

        dispatch(
          AllActions.creatureCardActions.changeStatus({
            idCreature: targetId,
            newStatus: 'poisoned',
          })
        );
      }
    },
    description:
      'Poisons the creature right in front of it, it will continue until the creature is killed or their status is changed',
  },

  CutOneHead: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const ThisEffectBody = currentState.effects.effectsLine.find(
        (Effect) =>
          Effect.body.effect === 'CutOneHead' &&
          Effect.body.OwnerId === CardEffectOwnerId
      )?.body;

      const cardsInGame = currentState.creatureCard;

      const thisHydra = ThisEffectBody.ownerFullData;

      const currentTable = currentState.table;
      const playerTabelSide = currentTable[PlayerSideID];

      if (
        thisHydra.status === 'normal' &&
        playerTabelSide[OwnerPositionID] === null
      ) {
        let creatureName = 'Hydra';
        const creatureSummoned = CardsList[creatureName];
        if (creatureSummoned) {
          const creatureId = `${creatureSummoned.name}-${Math.round(
            Math.random() * Math.random() * 10000,
            0
          )}`;

          dispatch(
            AllActions.creatureCardActions.invokeCreature({
              id: creatureId,
              creature: creatureSummoned,
            })
          );

          dispatch(
            AllActions.tableActions.addCard({
              creatureId: creatureId,
              tableside: PlayerSideID,
              space: OwnerPositionID,
            })
          );

          const effectToAdd = {
            ...creatureSummoned.cardEffectStart,
            OwnerPositionID: OwnerPositionID,
            PlayerSideID: PlayerSideID,
            OwnerId: creatureId,
          };

          dispatch(AllActions.effectsActions.addEffect(effectToAdd));
        }
      }
    },
    description:
      "Hydra can't be killed while in normal status, if so it will come back to the game with full health.",
  },

  GreatSacrifice: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
      } else {
        ownerOfCreaturePlayer = 'player2';
      }

      dispatch(
        AllActions.playerActions.healPlayer({
          player: ownerOfCreaturePlayer,
          healAmount: 10,
        })
      );
    },
    description: 'HolyKnight uses his last breath to heal his owner in 10HP.',
  },

  Ragnarok: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      const currentTurnNumber = currentState.turn.turnCount;

      dispatch(
        AllActions.effectsActions.addEffect({
          OwnerId: CardEffectOwnerId,
          PlayerSideID: PlayerSideID,
          OwnerPositionID: OwnerPositionID,
          effect: 'EndOfTheWorld',
          turnPlaced: currentTurnNumber,
        })
      );
    },
    description:
      "If Fenrir survive 7 turns of it's owner, he will kill the player with the smallest amount of HP and finish the game, a tie kills the opponent.",
  },

  EndOfTheWorld: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      const thisEffectBody = currentState.effects.effectsLine.find(
        (effectInLine) =>
          effectInLine.body.effect === 'EndOfTheWorld' &&
          effectInLine.body.OwnerId === CardEffectOwnerId
      );

      const ActivationTurn =
        thisEffectBody.body.turnPlaced +
        5 * 2 * currentState.turn.allStages.length;

      const currentTurnNumber = currentState.turn.turnCount;

      const currentTurnStage = currentState.turn.stage;

      let ownerOfCreaturePlayer;
      let playerSide;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
      }

      return (
        currentTurnStage === 'End' &&
        currentTurnNumber >= ActivationTurn &&
        currentState.turn.sideTurn === ownerOfCreaturePlayer
      );
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {
      let ownerOfCreaturePlayer;
      let playerSide;
      let opponent;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
        opponent = 'player2';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
        opponent = 'player1';
      }

      const cardsInGame = currentState.creatureCard;
      const currentTable = currentState.table[playerSide];

      let FenrirInGame = false;
      if (currentTable.some((CreatureId) => CreatureId === CardEffectOwnerId)) {
        FenrirInGame = true;
      }

      if (FenrirInGame) {
        const ownerHp = currentState.player[ownerOfCreaturePlayer]?.health;
        const opponentHp = currentState.player[opponent]?.health;

        if (ownerHp >= opponentHp) {
          dispatch(
            AllActions.playerActions.takeDamage({
              player: opponent,
              damage: opponentHp,
            })
          );
        } else {
          dispatch(
            AllActions.playerActions.takeDamage({
              player: ownerOfCreaturePlayer,
              damage: ownerHp,
            })
          );
        }
      } else {
        return;
      }
    },
    description: 'The End',
  },

  AllIn: {
    condition(currentState, CardEffectOwnerId, PlayerSideID, OwnerPositionID) {
      return true;
    },
    effect(
      AllActions,
      dispatch,
      currentState,
      CardEffectOwnerId,
      PlayerSideID,
      OwnerPositionID
    ) {

      let ownerOfCreaturePlayer;
      let playerSide;

      if (PlayerSideID.includes('player1')) {
        ownerOfCreaturePlayer = 'player1';
        playerSide = 'player1side';
      } else {
        ownerOfCreaturePlayer = 'player2';
        playerSide = 'player2side';
      }

      const currentTable = currentState.table[playerSide];

      if (currentTable.some((CreatureId) => CreatureId === CardEffectOwnerId)) {
        const playerMana = currentState.player[ownerOfCreaturePlayer].mana;
        const playerHealth = currentState.player[ownerOfCreaturePlayer].health;
        dispatch(AllActions.creatureCardActions.changeAttack({idCreature: CardEffectOwnerId, newAttack: playerMana + playerHealth}));
        dispatch(AllActions.creatureCardActions.changeManaCost({idCreature: CardEffectOwnerId, newManaCost: playerMana + playerHealth}));
      }

    },
    description: 'King Of Spades receives the sum of the players mana and HP as attack and mana cost',
  },
};
