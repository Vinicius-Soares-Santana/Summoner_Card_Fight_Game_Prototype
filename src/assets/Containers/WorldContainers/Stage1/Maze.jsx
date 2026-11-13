import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';
import ScenePiece from '../ScenePiece';
import NextSceneButton from '../../../Containers/NextSceneButton';
import ElizabethSon from './Characters1/ElizabethSon';
import './Maze.css';


function Maze(props){
    const previousMazePosition = useSelector((state) => state.playerWorld.MazePosition);
    const currentMonsterposition = useSelector((state) => state.worldState.mazeMonsterPosition);
    const playerInventoryCreatures = useSelector((state) => state.playerWorld.availableCreatures);
    const ElisabethQuest = useSelector((state) => state.worldState.quests['MazeQuest']);
    const JasonEvent = useSelector((state) => state.worldState.worldEvents['ElizabethsChildEvent']);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Entrance = {x:7, y:15};
    const ElizabethSonPosition = {x:13, y:3};
    const monsterRelicPosition = {x:3, y:4};
    const facingDirectionInitial = 'north';

    const [mazePosition, setMazePosition] = useState(previousMazePosition?.position ? previousMazePosition.position : Entrance);
    const [facingDirection, setFacingDirection] = useState(previousMazePosition?.facing ? previousMazePosition.facing : facingDirectionInitial);
    const [monsterPosition, setMonsterPosition] = useState(currentMonsterposition ? currentMonsterposition : {});

    const directionToMove = {'north': {x: 0, y: -1}, 'east': {x: 1, y: 0}, 'south': {x: 0, y: 1}, 'west': {x: -1, y: 0}, }
    


    const leftPath = ['left'];
    const upPath = ['up'];
    const rightPath = ['right'];
    const downPath = ['down'];

    const leftUpPath = ['left', 'up'];
    const leftRightPath = ['left', 'right'];
    const leftDownPath = ['left', 'down'];
    const upRightPath = ['up', 'right'];
    const upDownPath = ['up', 'down'];
    const rightDownPath = ['right', 'down'];

    const leftUpRightPath = ['left', 'up', 'right'];
    const leftUpDownPath = ['left', 'up', 'down'];
    const leftRightDownPath = ['left', 'right', 'down'];
    const upRightDownPath = ['up', 'right', 'down'];

    const leftUpRightDownPath = ['left', 'up', 'right', 'down'];



    const mazeImages = import.meta.glob('../../../Images/Stage1/Maze/*.png', {
        eager: true,
        query: '?url',
        import: 'default',
    });

    const bg = (fileName) =>
    mazeImages[`../../../Images/Stage1/Maze/${fileName}`] ?? '';




    const backgroundsByDirection = {
        left: bg('path-left.png'),
        up: bg('path-up.png'),
        right: bg('path-right.png'),
        down: bg('path-down.png'),
    
        leftup: bg('path-up-left.png'),
        leftright: bg('path-right-left.png'),
        leftdown: bg('path-down-left.png'),
        upright: bg('path-up-right.png'),
        updown: bg('path-up-down.png'),
        rightdown: bg('path-right-down.png'),
    
        leftupright: bg('path-up-right-left.png'),
        leftupdown: bg('path-up-down-left.png'),
        leftrightdown: bg('path-right-down-left.png'),
        uprightdown: bg('path-up-right-down.png'),
    
        leftuprightdown: bg('path-up-right-down-left.png'),
    };




    const MazeMap = {
        1: {},
        2: {
            1: { background: bg('path-right-down.png'), directions: rightDownPath },
            2: { background: bg('path-right-left.png'), directions: leftRightPath },
            3: { background: bg('path-right-left.png'), directions: leftRightPath },
            4: { background: bg('path-right-left.png'), directions: leftRightPath },
            5: { background: bg('path-right-left.png'), directions: leftRightPath },
            6: { background: bg('path-right-left.png'), directions: leftRightPath },
            7: { background: bg('path-right-left.png'), directions: leftRightPath },
            8: { background: bg('path-right-left.png'), directions: leftRightPath },
            9: { background: bg('path-right-down-left.png'), directions: leftRightDownPath },
            10: { background: bg('path-right-left.png'), directions: leftRightPath },
            11: { background: bg('path-right-left.png'), directions: leftRightPath },
            12: { background: bg('path-right-left.png'), directions: leftRightPath },
            13: { background: bg('path-down-left.png'), directions: leftDownPath },
        },
        3: {
            1: { background: bg('path-up-down.png'), directions: upDownPath },
            9: { background: bg('path-up-down.png'), directions: upDownPath },
            13: { background: bg('elizabeth-child.png') || bg('path-up-down.png'), directions: upDownPath },
        },
        4: {
            1: { background: bg('path-up-down.png'), directions: upDownPath },
            3: { background: bg('path-down.png'), directions: downPath },
            5: { background: bg('path-right-down.png'), directions: rightDownPath },
            6: { background: bg('path-right-left.png'), directions: leftRightPath },
            7: { background: bg('path-right-left.png'), directions: leftRightPath },
            8: { background: bg('path-right-left.png'), directions: leftRightPath },
            9: { background: bg('path-up-right-left.png'), directions: leftUpRightPath },
            10: { background: bg('path-right-left.png'), directions: leftRightPath },
            11: { background: bg('path-right-left.png'), directions: leftRightPath },
            12: { background: bg('path-right-left.png'), directions: leftRightPath },
            13: { background: bg('hint-y4-x13-up.png'), directions: leftUpDownPath },
        },
        5: {
            1: { background: bg('path-up-down.png'), directions: upDownPath },
            3: { background: bg('path-up-down.png'), directions: upDownPath },
            5: { background: bg('path-up-down.png'), directions: upDownPath },
            13: { background: bg('path-up-down.png'), directions: upDownPath },
        },
        6: {
            1: { background: bg('path-up-right.png'), directions: upRightPath },
            2: { background: bg('path-right-left.png'), directions: leftRightPath },
            3: { background: bg('path-up-down-left.png'), directions: leftUpDownPath },
            5: { background: bg('path-up-down.png'), directions: upDownPath },
            7: { background: bg('path-right-down.png'), directions: rightDownPath },
            8: { background: bg('path-right-left.png'), directions: leftRightPath },
            9: { background: bg('path-right-left.png'), directions: leftRightPath },
            10: { background: bg('path-right-left.png'), directions: leftRightPath },
            11: { background: bg('path-right-left.png'), directions: leftRightPath },
            12: { background: bg('path-right-left.png'), directions: leftRightPath },
            13: { background: bg('path-up-down-left.png'), directions: leftUpDownPath },
        },
        7: {
            3: { background: bg('path-up-down.png'), directions: upDownPath },
            5: { background: bg('path-up-down.png'), directions: upDownPath },
            7: { background: bg('path-up-down.png'), directions: upDownPath },
            13: { background: bg('path-up-down.png'), directions: upDownPath },
        },
        8: {
            1: { background: bg('path-down.png'), directions: downPath },
            3: { background: bg('path-up-down.png'), directions: upDownPath },
            5: { background: bg('path-up-down.png'), directions: upDownPath },
            7: { background: bg('path-up-down.png'), directions: upDownPath },
            9: { background: bg('path-right-down.png'), directions: rightDownPath },
            10: { background: bg('path-right-left.png'), directions: leftRightPath },
            11: { background: bg('path-down-left.png'), directions: leftDownPath },
            13: { background: bg('path-up.png'), directions: upPath },
        },
        9: {
            1: { background: bg('path-up-down.png'), directions: upDownPath },
            3: { background: bg('path-up-down.png'), directions: upDownPath },
            5: { background: bg('path-up-down.png'), directions: upDownPath },
            7: { background: bg('path-up-down.png'), directions: upDownPath },
            9: { background: bg('path-up-down.png'), directions: upDownPath },
            11: { background: bg('path-up-down.png'), directions: upDownPath },
        },
        10: {
            1: { background: bg('path-up-right-down.png'), directions: upRightDownPath },
            2: { background: bg('path-right-left.png'), directions: leftRightPath },
            3: { background: bg('path-up-left.png'), directions: leftUpPath },
            5: { background: bg('path-up-right.png'), directions: upRightPath },
            6: { background: bg('path-right-left.png'), directions: leftRightPath },
            7: { background: bg('path-up-right-left.png'), directions: leftUpRightPath },
            8: { background: bg('path-right-left.png'), directions: leftRightPath },
            9: { background: bg('hint-y10-x9-left.png'), directions: leftUpRightPath },
            10: { background: bg('path-right-left.png'), directions: leftRightPath },
            11: { background: bg('path-up-right-left.png'), directions: leftUpRightPath },
            12: { background: bg('path-right-left.png'), directions: leftRightPath },
            13: { background: bg('path-down-left.png'), directions: leftDownPath },
        },
        11: {
            1: { background: bg('path-up-down.png'), directions: upDownPath },
            13: { background: bg('path-up-down.png'), directions: upDownPath },
        },
        12: {
            1: { background: bg('path-up-right.png'), directions: upRightPath },
            2: { background: bg('path-right-left.png'), directions: leftRightPath },
            3: { background: bg('path-down-left.png'), directions: leftDownPath },
            5: { background: bg('path-right-down.png'), directions: rightDownPath },
            6: { background: bg('path-right-left.png'), directions: leftRightPath },
            7: { background: bg('hint-y12-x7-right.png'), directions: leftRightDownPath },
            8: { background: bg('path-right-left.png'), directions: leftRightPath },
            9: { background: bg('path-right-left.png'), directions: leftRightPath },
            10: { background: bg('path-right-left.png'), directions: leftRightPath },
            11: { background: bg('path-down-left.png'), directions: leftDownPath },
            13: { background: bg('path-up-down.png'), directions: upDownPath },
        },
        13: {
            3: { background: bg('path-up-down.png'), directions: upDownPath },
            5: { background: bg('path-up-down.png'), directions: upDownPath },
            7: { background: bg('path-up-down.png'), directions: upDownPath },
            11: { background: bg('path-up-down.png'), directions: upDownPath },
            13: { background: bg('path-up-down.png'), directions: upDownPath },
        },
        14: {
            1: { background: bg('path-right.png'), directions: rightPath },
            2: { background: bg('path-right-left.png'), directions: leftRightPath },
            3: { background: bg('path-up-right-left.png'), directions: leftUpRightPath },
            4: { background: bg('path-right-left.png'), directions: leftRightPath },
            5: { background: bg('path-up-left.png'), directions: leftUpPath },
            7: { background: bg('path-up-down.png'), directions: upDownPath },
            9: { background: bg('path-right.png'), directions: rightPath },
            10: { background: bg('path-right-left.png'), directions: leftRightPath },
            11: { background: bg('path-up-right-left.png'), directions: leftUpRightPath },
            12: { background: bg('path-right-left.png'), directions: leftRightPath },
            13: { background: bg('path-up-left.png'), directions: leftUpPath },
        },
        15: {
            7: { background: bg('entrance.png') || bg('path-up.png'), directions: upPath },
        },
    };



    

    function updatePositionDisplay(currentFacingDirection, availableDirections, updateAmount){
        const cardinalDirections = ['north', 'east', 'south', 'west'];
        const mazeFixedDirection = ['up', 'right', 'down', 'left'];

        const cardinalDirectionIndex = cardinalDirections.indexOf(currentFacingDirection);

        

        const newPathDirections = availableDirections.map((directionFound, dirIndex) => mazeFixedDirection.at(mazeFixedDirection.indexOf(directionFound) - cardinalDirectionIndex));

        return newPathDirections;
    }



    function changeFacingDirection(currentFacingDirection, howMuchToMove){
        const possibleCardinalDirections = ['north', 'east', 'south', 'west'];

        const indexOfCurrentFacing = possibleCardinalDirections.indexOf(currentFacingDirection);

        let nextCardinalIndex = indexOfCurrentFacing + howMuchToMove

        if(nextCardinalIndex >= possibleCardinalDirections.length) nextCardinalIndex=0;
        if(nextCardinalIndex < 0) nextCardinalIndex=possibleCardinalDirections.length-1;

        const newFacingDirection = possibleCardinalDirections[nextCardinalIndex];

        setFacingDirection(newFacingDirection);

        dispatch(playerWorldActions.setMazeFacingWorld(newFacingDirection));
    }



    function retrieveBackground(updatedPositionArray, backgroundsByDirectionObject, positionInMaze){
        const directionsConsultOrder = ['left', 'up', 'right', 'down'];

        const backgroundKey = directionsConsultOrder.filter((direction) => updatedPositionArray.includes(direction)).join('');

        return backgroundsByDirectionObject[backgroundKey] ?? '';
    }


    

    const MazeAvailableDirectionsFixed = MazeMap[mazePosition.y]?.[mazePosition.x]?.directions ?? []

    const currentPositionDisplayer = updatePositionDisplay(facingDirection, MazeAvailableDirectionsFixed);

    const positionBackground = retrieveBackground(currentPositionDisplayer, backgroundsByDirection, mazePosition);

    const entrancePosition = Boolean(mazePosition.x == Entrance.x && mazePosition.y == Entrance.y);

    function moveInMaze(addInX = 0, addInY = 0){
        const {x, y} = mazePosition
        const nextX = x + addInX;
        const nextY = y + addInY;
        if(addInX != 0){
            if(nextX >= 0 && nextX < 15){
                setMazePosition({x: nextX, y: y})
                dispatch(playerWorldActions.setMazePositionWorld({x: nextX, y: y}))
                return
            }
        }
        
        if(addInY != 0){
            if(nextY > 0 && nextY < 16){
                setMazePosition({x:x, y: nextY})
                dispatch(playerWorldActions.setMazePositionWorld({x:x, y: nextY}))
                return
            }
        }
        
    }

    const showUpButton = currentPositionDisplayer.includes('up');
    const showMonsterRune = !playerInventoryCreatures.includes('Gashadokuro');
    const isInRunePosition = (mazePosition.x === monsterRelicPosition.x && mazePosition.y === monsterRelicPosition.y);

    const isElizabethSonPosition = (mazePosition.x === ElizabethSonPosition.x && mazePosition.y === ElizabethSonPosition.y);
    const elizabethQuestAccepted = (ElisabethQuest != null && ElisabethQuest != undefined);
    const jsonEventFinished = (JasonEvent?.status ? JasonEvent?.status != 'complete' : true);
 
    function onClickGashadokuro(event){
        dispatch(playerWorldActions.addAvailableCreature({creatureName: 'Gashadokuro'}));
        dispatch(worldStateActions.setMazeMonsterPositionWorld(null));
        dispatch(playerWorldActions.changeDialog({
            image: '',
            title: 'Rune acquired',
            message: 'Gashadokuro has been added to your collection. The maze feels strangely quiet now.',
            eventName: '',
            options: ['Ok'],
            proceedStep: false,
          }));
    }

    

    //Monster Section ------------------------------------------------------------------------------------------------------------

    function MoveMonster(currentMonsterPositionParam){
        if(currentMonsterPositionParam == null) return
        const moveOrNot = Math.random();
        if(moveOrNot>0.2){
            const directionOptions = 
                    MazeMap[currentMonsterPositionParam.y]?.[currentMonsterPositionParam.x]?.directions ? 
                                MazeMap[currentMonsterPositionParam.y]?.[currentMonsterPositionParam.x]?.directions : [];
            const randomDirectionIndex = Math.floor(Math.random()*directionOptions.length);
            const randomDirectionChosen = directionOptions[randomDirectionIndex];

            const cardinalDirections = ['north', 'east', 'south', 'west'];
            const mazeFixedDirection = ['up', 'right', 'down', 'left'];

            const mazeFixedDirectionIndex = mazeFixedDirection.indexOf(randomDirectionChosen);
            const cardinalResult = cardinalDirections[mazeFixedDirectionIndex];

            const moveSet = directionToMove[cardinalResult];

            const afterMovePosition = {x: currentMonsterPositionParam.x + moveSet.x, y: currentMonsterPositionParam.y + moveSet.y};

            if((afterMovePosition.x > 0 && afterMovePosition.x < 16) && (afterMovePosition.y > 0 && afterMovePosition.y < 15)){
                setMonsterPosition(afterMovePosition);
                dispatch(worldStateActions.setMazeMonsterPositionWorld(afterMovePosition));
            }
        }
    }

    function getMonsterProximity(mazeMap, playerPosition, monsterPosition) {
        const noSignal = { distance: null, intensity: 0, direction: null };
        if (!monsterPosition) return noSignal;
      
        const detectionRange = 5;
        const offsets = {
          up: { x: 0, y: -1 },
          right: { x: 1, y: 0 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
        };
      
        const queue = [{ ...playerPosition, distance: 0, firstDirection: null }];
        const visited = new Set([`${playerPosition.x},${playerPosition.y}`]);
      
        for (let i = 0; i < queue.length; i++) {
          const { x, y, distance, firstDirection } = queue[i];
      
          if (x === monsterPosition.x && y === monsterPosition.y) {
            return {
              distance,
              intensity: Math.max(0, 1 - distance / detectionRange),
              direction: firstDirection,
            };
          }
      
          const exits = mazeMap[y]?.[x]?.directions ?? [];
      
          for (const direction of exits) {
            const offset = offsets[direction];
            const nextX = x + offset.x;
            const nextY = y + offset.y;
            const key = `${nextX},${nextY}`;
      
            if (visited.has(key) || !mazeMap[nextY]?.[nextX]) continue;
      
            visited.add(key);
            queue.push({
              x: nextX,
              y: nextY,
              distance: distance + 1,
              firstDirection: firstDirection ?? direction,
            });
          }
        }
      
        return noSignal;
      }

      const { distance, intensity, direction } = getMonsterProximity(
        MazeMap,
        mazePosition,
        currentMonsterposition
      );

      const monsterDirectionOnScreen = direction
                ? updatePositionDisplay(facingDirection, [direction])[0]
                : undefined;


    useEffect(() => {
        console.log(JSON.stringify(monsterPosition));

        if(!currentMonsterposition) return
        
        if (
            mazePosition.x === monsterPosition.x &&
            mazePosition.y === monsterPosition.y
            ) {
            navigate('/');
            }
        
    }, [mazePosition, playerInventoryCreatures, currentMonsterposition])
    
    //==============================================================================================================================================


    const showMonsterInTheDark = (distance == 1 && direction == 'up');

    return  <div className="Maze SceneGrid" data-monster-direction={monsterDirectionOnScreen} style={
                    {
                        backgroundImage: positionBackground
                            ? `url("${positionBackground}")`
                            : undefined,
                        backgroundSize: 'Cover',
                        '--monster-intensity': intensity,
                    }
                } >

                {showUpButton && (<ScenePiece at="G1" cols={3} rows={3} >
                                        <button className="upButton" onClick={() => { 
                                                const {x, y} = directionToMove[facingDirection]
                                                moveInMaze(x, y)
                                                MoveMonster(currentMonsterposition)
                                                }
                                            }>
                                        Up</button>
                                    </ScenePiece>)
                }

                {(<ScenePiece at="A9" cols={3} rows={3} >
                    <button className="leftButton" onClick={() => {changeFacingDirection(facingDirection, -1); MoveMonster(currentMonsterposition);}}>Left</button>
                </ScenePiece>)
                }

                {(<ScenePiece at="N9" cols={3} rows={3} >
                    <button className="rightButton" onClick={() => {changeFacingDirection(facingDirection, 1); MoveMonster(currentMonsterposition)}}>Right</button>
                </ScenePiece>)
                }

                {entrancePosition && (<ScenePiece at="G13" cols={3} rows={3} >
                                        <NextSceneButton destination='/game/stage1/castlefieldsleft2' buttonText='Castle Fields 2' />
                                    </ScenePiece>)
                }

                {(showMonsterRune && isInRunePosition) && (
                                    <ScenePiece at="G15" cols={3} rows={3} >
                                        <button 
                                            className="MazeRelic" 
                                            onClick={onClickGashadokuro}
                                            style={{
                                                backgroundImage: 'url()',
                                            }}
                                         >
                                            Relic
                                        </button>
                                    </ScenePiece>
                                )
                }

                {(isElizabethSonPosition && elizabethQuestAccepted && jsonEventFinished) && (
                                    <ScenePiece at="B5" cols={3} rows={5} >
                                        <ElizabethSon />
                                    </ScenePiece>
                                )
                }

                { showMonsterInTheDark && (
                                    <ScenePiece at="B5" cols={4} rows={8} >
                                        <img src='../../../Images/Stage1/Maze/Moss-eyed-Gashadokuro-1.png' alt='Monsters' ></img>
                                    </ScenePiece>
                                )
                }

            </div>
}

export default Maze;
