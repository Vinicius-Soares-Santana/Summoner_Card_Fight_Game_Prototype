import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';
import NextSceneButton from '../../../Containers/NextSceneButton';
import ScenePiece from '../ScenePiece';
import './BossGate.css'

function BossGate(props){

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


    useEffect(() => {
        if (openTheDoorQuestData == null) {
            dispatch(worldStateActions.addQuest(GateOpenQuest));
        }

        if (purpleChallengeData == null) {
            dispatch(worldStateActions.addQuest(PurpleChallengeQuest));
        }


    }, [openTheDoorQuestData, purpleChallengeData])
    

    return (
        <div className="BossGate SceneGrid">

            <ScenePiece at="C6" cols={2} rows={2}>
                <img className="redMarker" alt=""></img>
            </ScenePiece>

            <ScenePiece at="F8" cols={2} rows={2}>
                <img className="grayMarker" alt=""></img>
            </ScenePiece>

            <ScenePiece at="C6" cols={2} rows={2}>
                <img className="blueMarker" alt=""></img>
            </ScenePiece>

            { 
                AllDone && <ScenePiece at="M6" cols={2} rows={2}>
                                <button className="openGateButton"></button>
                            </ScenePiece>
            }


        </div>
    )
}

export default BossGate;