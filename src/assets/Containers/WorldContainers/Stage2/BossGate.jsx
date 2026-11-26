import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';
import { gainItemQuest } from '../../../../World/worldActions';
import NextSceneButton from '../../../Containers/NextSceneButton';
import ScenePiece from '../ScenePiece';
import './BossGate.css'

function BossGate(props){
    const destination = '/'
    const navigate = useNavigate();
    const {pathname, search, hash } = useResolvedPath(destination);

    const dispatch = useDispatch();

    const currentChallengesComplete = useSelector((state) => state.worldState.stage2ManaPuzzlesSolved);

    const openTheDoorQuestData = useSelector((state) => state.worldState.quests['GateOpenQuest'] ?? null);

    const purpleChallengeData = useSelector((state) => state.worldState.quests['PurpleChallenge'] ?? null);


    const GateOpenQuest = {questName: 'GateOpenQuest', currentObjective: 'Open the Gate',}

    const PurpleChallengeQuest = {questName: 'PurpleChallenge', currentObjective: '',}

    const mandatoryChallenges = ['gray', 'red', 'blue'];



    const greyDone = currentChallengesComplete.includes('gray');

    const redDone = currentChallengesComplete.includes('red');

    const blueDone = currentChallengesComplete.includes('blue');

    const purpleDone = currentChallengesComplete.includes('purple');

    const AllDone = mandatoryChallenges.every((name) => currentChallengesComplete.includes(name));

    function handleClickOpenDoor(){
        if(!AllDone) return;

        dispatch(worldStateActions.changeQuestStatus({questName: 'GateOpenQuest', newQuestStatus: 'complete'}));

        if(currentChallengesComplete.includes('purple')){
            dispatch(gainItemQuest('Elixir'));
        }

        dispatch(gainItemQuest('Amphisbaena'));

        
    }


    useEffect(() => {
        if (openTheDoorQuestData == null) {
            dispatch(worldStateActions.addQuest(GateOpenQuest));
        }

        if (purpleChallengeData == null) {
            dispatch(worldStateActions.addQuest(PurpleChallengeQuest));
        }


    }, [openTheDoorQuestData, purpleChallengeData])
    
    if(openTheDoorQuestData?.questStatus !== 'complete'){
        return (
            <div className="BossGate SceneGrid">
    
                <ScenePiece at="C6" cols={2} rows={2}>
                    <img className="redMarker" src={redDone ? '../../../Images/Stage2/BossGate/gate-red-on.png' : '../../../Images/Stage2/BossGate/gate-red-off.png'} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="F8" cols={2} rows={2}>
                    <img className="grayMarker" src={greyDone ? '../../../Images/Stage2/BossGate/gate-gray-on.png' : '../../../Images/Stage2/BossGate/gate-gray-off.png'} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="C6" cols={2} rows={2}>
                    <img className="blueMarker" src={blueDone ? '../../../Images/Stage2/BossGate/gate-blue-on.png' : '../../../Images/Stage2/BossGate/gate-blue-off.png'} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="C6" cols={2} rows={2}>
                    <img className="purpleMarker" src={purpleDone ? '../../../Images/Stage2/BossGate/gate-purple-on.png' : '../../../Images/Stage2/BossGate/gate-purple-off.png'} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="M6" cols={2} rows={2}>
                    <button className="openGateButton" style={{backgroundImage: '../../../Images/Stage2/BossGate/gate-open-mechanism.png'}} onClick={handleClickOpenDoor} ></button>
                </ScenePiece>
    
    
            </div>
        )
    } else {
        return (
            <button className="BossGate open" style={{backgroundImage: '../../../Images/Stage2/BossGate/gate-open-mechanism.png'}}
                onClick={() => {
                    const scenePath = `${pathname}${search}${hash}`
                    dispatch(worldStateActions.setPreviousScenarioPath(scenePath));
                    navigate(destination);
                }} >
            </button>
        )
    }
    
}

export default BossGate;