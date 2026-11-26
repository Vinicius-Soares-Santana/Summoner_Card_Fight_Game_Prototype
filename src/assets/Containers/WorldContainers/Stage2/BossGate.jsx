import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';
import { playerWorldActions } from '../../../../store/WorldSlices/PlayerWorldSlice';
import { gainItemQuest } from '../../../../World/worldActions';
import NextSceneButton from '../../../Containers/NextSceneButton';
import ScenePiece from '../ScenePiece';

import bossGateClosed from '../../../Images/Stage2/BossGate/boss-gate-background.png';
import bossGateOpen from '../../../Images/Stage2/BossGate/BossGate_Open.png';
import gateMechanism from '../../../Images/Stage2/BossGate/gate-open-mechanism.png';

import redOn from '../../../Images/Stage2/BossGate/gate-red-on.png';
import redOff from '../../../Images/Stage2/BossGate/gate-red-off.png';
import grayOn from '../../../Images/Stage2/BossGate/gate-gray-on.png';
import grayOff from '../../../Images/Stage2/BossGate/gate-gray-off.png';
import blueOn from '../../../Images/Stage2/BossGate/gate-blue-on.png';
import blueOff from '../../../Images/Stage2/BossGate/gate-blue-off.png';
import purpleOn from '../../../Images/Stage2/BossGate/gate-purple-on.png';
import purpleOff from '../../../Images/Stage2/BossGate/gate-purple-off.png';

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

        dispatch(gainItemQuest('Amphisbaena'));

        if(currentChallengesComplete.includes('purple')){
            dispatch(gainItemQuest('Elixir'));

            dispatch(playerWorldActions.changeDialog({
                image: '',
                title: 'Shop Updated',
                message: 'Elixir and Amphisbaena where added to your inventory',
                eventName: '',
                options: ['Ok'],
                proceedStep: false,
              }));
        } else {

            dispatch(playerWorldActions.changeDialog({
                image: '',
                title: 'Shop Updated',
                message: 'Amphisbaena was added to your inventory',
                eventName: '',
                options: ['Ok'],
                proceedStep: false,
              }));

        }
        
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
            <div className="BossGate SceneGrid" style={{ backgroundImage: `url(${bossGateClosed})` }} >
    
                <ScenePiece at="C6" cols={2} rows={2}>
                    <img className="redMarker" src={redDone ? redOn : redOff} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="F8" cols={2} rows={2}>
                    <img className="grayMarker" src={greyDone ? grayOn : grayOff} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="C6" cols={2} rows={2}>
                    <img className="blueMarker" src={blueDone ? blueOn : blueOff} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="C6" cols={2} rows={2}>
                    <img className="purpleMarker" src={purpleDone ? purpleOn : purpleOff} alt=""></img>
                </ScenePiece>
    
                <ScenePiece at="M6" cols={2} rows={2}>
                    <button className="openGateButton" style={{ backgroundImage: `url(${gateMechanism})` }} onClick={handleClickOpenDoor} ></button>
                </ScenePiece>
    
    
            </div>
        )
    } else {
        return (
            <button className="BossGate open" style={{ backgroundImage: `url(${bossGateOpen})` }}
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