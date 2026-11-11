import React from 'react';
import { useState, useEffect } from 'react-redux';
import ScenePiece from '../ScenePiece';


function Maze(props){
    const [mazePosition, setMazePosition] = useState({x:15, y:15});
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

    const MazeMap = {
        15: []
    }

    const currentPositionDisplayer = MazeMap[mazePosition.x][mazePosition.y];

    function moveInMaze(addInX = 0, addInY = 0){
        const {x, y} = mazePosition
        if(x > 0 && x < 15){
            setMazePosition({x:(x+addInX), y: y})
        }
        if(x > 0 && y < 15){
            setMazePosition({x:x, y: (y+addInY)})
        }
    }

    const showUpButton = currentPositionDisplayer.includes('up');
    const showLeftButton = currentPositionDisplayer.includes('left');
    const showRightButton = currentPositionDisplayer.includes('right');
    const showDownButton = currentPositionDisplayer.includes('down');

    return  <div className="Maze">
                {showUpButton && (<ScenePiece at="G1" cols={3} rows={3} >
                                        <button className="upButton" onClick={() => moveInMaze(0, 1)}></button>
                                    </ScenePiece>)
                }

                {showDownButton && (<ScenePiece at="G15" cols={3} rows={3} >
                                        <button className="downButton" onClick={() => moveInMaze(0, -1)}></button>
                                    </ScenePiece>)
                }

                {showLeftButton && (<ScenePiece at="A9" cols={3} rows={3} >
                                        <button className="leftButton" onClick={() => moveInMaze(-1, 0)}></button>
                                    </ScenePiece>)
                }

                {showRightButton && (<ScenePiece at="P9" cols={3} rows={3} >
                                        <button className="rightButton" onClick={() => moveInMaze(1, 0)}></button>
                                    </ScenePiece>)
                }


            </div>
}

export default Maze;