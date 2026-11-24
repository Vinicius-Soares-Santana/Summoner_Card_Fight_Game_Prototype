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




    function addValuePlatform (value, platform, turn){
        if(turn != 'player') return;

        let newAvailableValuesPlayer = availableValuesPlayer.filter((valueExistent) => valueExistent != value);
        setAvailableValuesPlayer(newAvailableValuesPlayer);


        if(platform == "one"){

            let newValues = platformOne;
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

            let newValues = platformTwo;
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

        if(newAvailableValuesPlayer.length < 1){
            if(playerOneScore < aiScore){
                setResult('victory');
            } else if (aiScore <= playerOneScore){
                setResult('defeat');
            }
        } else {
            setTurn('ai');
        }
    }

    function buttonsCreator (list) {
        for (const value of list) {
            return <button aria-pressed={value == selectedValue} className={`valueButton ${value}`} key={value} 
                    onClick={() => turn === 'player' ? selectedValue ? setSelectedValue(null) : setSelectedValue(value) : setSelectedValue(null)} >{value}</button>
        }
    }


    useEffect(() => {
        if(availableValuesAI.length < 1){
            setTurn('player');
            return
        }

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
                        chosenValue = Math.max(listOfPossibilities);
                    }
                    
                } else {
                    randomIndex = Math.floor(Math.random()*availableValuesAI.length)
                    chosenValue = listOfPossibilities[randomIndex];
                }

                setPlatformTwo([...platformTwo, chosenValue]);

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
                        chosenValue = Math.max(listOfPossibilities);
                    }
                    
                } else {
                    randomIndex = Math.floor(Math.random()*availableValuesAI.length)
                    chosenValue = listOfPossibilities[randomIndex];
                }

                setPlatformOne([...platformTwo, chosenValue]);

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
            { buttonsCreator(availableValuesPlayer) }
        </div>
    )
}

export default ManaChargeChallenge;