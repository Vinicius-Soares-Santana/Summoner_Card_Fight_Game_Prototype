import react, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NextSceneButton from '../../../Containers/NextSceneButton';
import './ManaChargeChallenge.css';

function ManaChargeChallenge(props){
    const [platformOne, setPlatformOne] = useState([]);
    const [platformTwo, setPlatformTwo] = useState([]);

    const [turn, setTurn] = useState('player');

    const startingValues = [0, 1, 2, 3, 4, 5, 6];

    const [availableValuesPlayer, setAvailableValuesPlayer] = useState(startingValues);
    const [availableValuesAI, setAvailableValuesAI] = useState(startingValues);

    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [aiScore, setAiScore] = useState(0);

    const [selectedValue, setSelectedValue] = useState(null);

    const [result, setResult] = useState(false);


    function showResult(results){
        if(results != false){
            return <h2>{results}</h2>
        }
    }



    function addValuePlatform (value, platform, turn){
        if(turn != 'player') return;
        if(value == null) return;

        let newAvailableValuesPlayer = availableValuesPlayer.filter((valueExistent) => valueExistent != value);
        setAvailableValuesPlayer(newAvailableValuesPlayer);


        if(platform == "one"){

            let newValues = [...platformOne];
            newValues.push(value);

            let sum = 0;
            for (const currentValue of newValues){
                sum += currentValue;
            }

            if(sum >= 13){
                setPlayerOneScore((playerOneScore + platformOne.length));
                setPlatformOne([]);
            } else {
                setPlatformOne(newValues);
            }

        } else if (platform == "two"){

            let newValues = [...platformTwo];
            newValues.push(value);

            let sum = 0;
            for (const currentValue of newValues){
                sum += currentValue;
            }

            if(sum >= 13){
                setPlayerOneScore((playerOneScore + platformTwo.length));
                setPlatformTwo([]);
            } else {
                setPlatformTwo(newValues);
            }

        }

        setSelectedValue(null);
    }



    useEffect(() => {
        if(availableValuesAI.length < 1){
            setTurn('player');
            return
        }

        if(availableValuesPlayer.length < 1 && availableValuesAI.length < 1 && turn == 'player'){
            if(playerOneScore < aiScore){
                setResult('victory');
            } else if (aiScore <= playerOneScore){
                setResult('defeat');
            }
        }

        let randomIndex;

        if(turn == 'ai'){
            let sum1 = 0;
            let sum2 = 0;

            let chosenValue = null;

            for (const value1 of platformOne) {
                sum1 += value1;
            }

            for (const value2 of platformTwo) {
                sum2 += value2;
            }

            if(sum1 > sum2){

                let listOfPossibilities = [];

                for (const possibleValue of availableValuesAI){
                    if((possibleValue + sum2) < 13){
                        listOfPossibilities.push(possibleValue);
                    }
                }

                if(listOfPossibilities.length > 0){
                    if(Math.random() > 0.5){
                        randomIndex = Math.floor(Math.random()*listOfPossibilities.length)
                        chosenValue = listOfPossibilities[randomIndex];
                    } else {
                        chosenValue = Math.max(...listOfPossibilities);
                    }
                    setPlatformTwo([...platformTwo, chosenValue]);
                    
                } else {
                    randomIndex = Math.floor(Math.random()*availableValuesAI.length)
                    chosenValue = availableValuesAI[randomIndex];

                    setAiScore((aiScore + platformTwo.length));
                    setPlatformTwo([]);
                }

                

            } else {

                let listOfPossibilities = [];

                for (const possibleValue of availableValuesAI){
                    if((possibleValue + sum1) < 13){
                        listOfPossibilities.push(possibleValue);
                    }
                }

                if(listOfPossibilities.length > 0){
                    if(Math.random() > 0.5){
                        randomIndex = Math.floor(Math.random()*listOfPossibilities.length)
                        chosenValue = listOfPossibilities[randomIndex];
                    } else {
                        chosenValue = Math.max(...listOfPossibilities);
                    }

                    setPlatformOne([...platformOne, chosenValue]);
                    
                } else {
                    randomIndex = Math.floor(Math.random()*availableValuesAI.length)
                    chosenValue = availableValuesAI[randomIndex];

                    setAiScore((aiScore + platformOne.length));
                    setPlatformOne([]);
                }

                

            }

            if(chosenValue != null){
                const updatedOptionsAi = availableValuesAI.filter((existing) => existing != chosenValue);
                setAvailableValuesAI(updatedOptionsAi);
            }

        }

        setTurn('player');

    }, [turn])


    return (
        <div className={`ManaChargeChallenge ${props.challengeId}`}>

            <div className="PlatformOne">
                {platformOne.map((num, numIndex) => <h3 className="PlatOneNumDisplayed" key={`PlatformOne ${num} index${numIndex}`}>{num}</h3>)}
                <button className="PlatOneButton" onClick={() => {addValuePlatform(selectedValue, "one", turn)}} >Platform 1</button>
            </div>

            <div className="PlatformTwo">
                {platformTwo.map((num, numIndex) => <h3 className="PlatTwoNumDisplayed" key={`PlatformTwo ${num} index${numIndex}`}>{num}</h3>)}
                <button className="PlatTwoButton" onClick={() => {addValuePlatform(selectedValue, "two", turn)}} >Platform 2</button>
            </div>

            <div className="PlayerOptions">
                { availableValuesPlayer.map((value) => {
                return <button aria-pressed={value == selectedValue} className={`valueButton ${value}`} key={value} 
                        onClick={() => turn === 'player' ? selectedValue ? setSelectedValue(null) : setSelectedValue(value) : setSelectedValue(null)} >{value}</button>
                }) }
            </div>

            <div className="Score">
                <h3>{`Player Score: ${playerOneScore}`}</h3>
                <h3>{`Ai Score: ${aiScore}`}</h3>
            </div>

            {showResult(result)}

        </div>
    )
}

export default ManaChargeChallenge;