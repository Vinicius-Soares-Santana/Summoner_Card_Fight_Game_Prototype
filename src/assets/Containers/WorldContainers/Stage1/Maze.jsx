import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import ScenePiece from '../ScenePiece';
import NextSceneButton from '../../../Containers/NextSceneButton';
import './Maze.css';


function Maze(props){
    const previousMazePosition = useSelector((state) => state.playerWorld.MazePosition);
    const dispatch = useDispatch();

    const Entrance = {x:7, y:15};
    const ElizabethSonPosition = {x:13, y:3};
    const facingDirectionInitial = 'north';

    const [mazePosition, setMazePosition] = useState(previousMazePosition?.position ? previousMazePosition.position : Entrance);
    const [facingDirection, setFacingDirection] = useState(previousMazePosition?.facing ? previousMazePosition.facing : facingDirectionInitial);

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

        const newPathDirections = availableDirections.map((directionFound, dirIndex) => mazeFixedDirection[mazeFixedDirection.indexOf(directionFound) - cardinalDirectionIndex]);

        return newPathDirections;
    }



    function changeFacingDirection(currentFacingDirection, howMuchToMove){
        const possibleCardinalDirections = ['north', 'east', 'south', 'west'];

        const indexOfCurrentFacing = possibleCardinalDirections.indexOf(currentFacingDirection);

        const nextCardinalIndex = indexOfCurrentFacing + howMuchToMove

        if(nextCardinalIndex > possibleCardinalDirections.length) nextCardinalIndex=0;
        if(nextCardinalIndex < 0) nextCardinalIndex=3;

        const newFacingDirection = possibleCardinalDirections[nextCardinalIndex];

        setFacingDirection(newFacingDirection);

        dispatch(playerWorldActions.setMazeFacingWorld(newFacingDirection));
    }



    function retrieveBackground(updatedPositionArray, backgroundsByDirectionObject){
        const directionsConsultOrder = ['left', 'up', 'right', 'down'];

        const backgroundKey = directionsConsultOrder.filter((direction) => updatedPositionArray.includes(direction)).join('');

        return backgroundsByDirectionObject[backgroundKey] ?? '';
    }


    

    const MazeAvailableDirectionsFixed = MazeMap[mazePosition.y]?.[mazePosition.x]?.directions ?? []

    const currentPositionDisplayer = updatePositionDisplay(facingDirection, MazeAvailableDirectionsFixed);

    const positionBackground = retrieveBackground(currentPositionDisplayer, backgroundsByDirection);

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
 



    return  <div className="Maze SceneGrid" style={{backgroundImage: positionBackground ? `url("${positionBackground}")` : undefined,}} >
                {showUpButton && (<ScenePiece at="G1" cols={3} rows={3} >
                                        <button className="upButton" onClick={() => { 
                                                const {x, y} = directionToMove[facingDirection]
                                                moveInMaze(x, y)
                                                }
                                            }>
                                        Up</button>
                                    </ScenePiece>)
                }

                {(<ScenePiece at="A9" cols={3} rows={3} >
                    <button className="leftButton" onClick={() => changeFacingDirection(facingDirection, -1)}>Left</button>
                </ScenePiece>)
                }

                {(<ScenePiece at="N9" cols={3} rows={3} >
                    <button className="rightButton" onClick={() => changeFacingDirection(facingDirection, 1)}>Right</button>
                </ScenePiece>)
                }

                {entrancePosition && (<ScenePiece at="G13" cols={3} rows={3} >
                                        <NextSceneButton destination='/game/stage1/castlefieldsleft2' buttonText='Castle Fields 2' />
                                    </ScenePiece>)
                }

            </div>
}

export default Maze;