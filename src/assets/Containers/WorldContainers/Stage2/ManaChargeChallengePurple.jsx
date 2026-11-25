import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NextSceneButton from '../../NextSceneButton';
import { worldStateActions } from '../../../../store/WorldSlices/WorldStateSlice';
import './ManaChargeChallengePurple.css';

const challengeName = 'purple';
const limitsAvailable = [12, 13, 14];
const limit = limitsAvailable[Math.floor(Math.random()*limitsAvailable.length)];
const startingValues = [0, 1, 2, 3, 4, 5, 6];
const participantNames = ['You', 'AI 1', 'AI 2', 'AI 3'];

function createGame() {
    return {
        platforms: [[], []],
        hands: participantNames.map(() => [...startingValues]),
        scores: participantNames.map(() => 0),
        turn: 0,
    };
}

function getSum(platform) {
    return platform.reduce((sum, value) => sum + value, 0);
}

function playMove(game, participant, value, platformIndex) {
    if (game.turn !== participant || !game.hands[participant].includes(value)) {
        return game;
    }

    const platform = game.platforms[platformIndex];
    const nextPlatform = [...platform, value];
    const overflow = getSum(nextPlatform) > limit;

    const platforms = [...game.platforms];
    platforms[platformIndex] = overflow ? [] : nextPlatform;

    const hands = [...game.hands];
    hands[participant] = hands[participant].filter((stone) => stone !== value);

    const scores = [...game.scores];
    if (overflow) {
        scores[participant] += platform.length;
    }

    const finished = hands.every((hand) => hand.length === 0);

    return {
        platforms,
        hands,
        scores,
        turn: finished ? null : (participant + 1) % participantNames.length,
    };
}

function chooseAiMove(game) {
    const [firstPlatform, secondPlatform] = game.platforms;
    const firstSum = getSum(firstPlatform);
    const secondSum = getSum(secondPlatform);
    const platformIndex = firstSum <= secondSum ? 0 : 1;
    const platformSum = Math.min(firstSum, secondSum);
    const hand = game.hands[game.turn];
    const safeValues = hand.filter((value) => platformSum + value <= limit);

    if (safeValues.length > 0 && Math.random() <= 0.5) {
        return { value: Math.max(...safeValues), platformIndex };
    }

    const choices = safeValues.length > 0 ? safeValues : hand;
    const value = choices[Math.floor(Math.random() * choices.length)];

    return { value, platformIndex };
}

export default function ManaChargeChallengePurple() {
    const dispatch = useDispatch();
    const [game, setGame] = useState(createGame);
    const [selectedValue, setSelectedValue] = useState(null);
    const isPlayerTurn = game.turn === 0;
    const finished = game.turn === null;
    const [playerScore, firstAiScore, secondAiScore] = game.scores;
    const victory = finished && playerScore < firstAiScore && playerScore < secondAiScore;

    useEffect(() => {
        if (isPlayerTurn || finished) return;

        const timer = setTimeout(() => {
            const { value, platformIndex } = chooseAiMove(game);

            setGame((current) => {
                if (current !== game) return current;
                return playMove(current, game.turn, value, platformIndex);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [game, isPlayerTurn, finished]);

    useEffect(() => {
        if (victory) {
            dispatch(worldStateActions.addManaPuzzle(challengeName));
        }
    }, [dispatch, victory]);

    function playSelectedValue(platformIndex) {
        if (!isPlayerTurn || selectedValue === null) return;

        setGame((current) => playMove(current, 0, selectedValue, platformIndex));
        setSelectedValue(null);
    }

    return (
        <div className="ManaChargeChallenge purple">
            <h2>Purple Mana Charge Challenge</h2>
            <p role="status">
                {finished
                    ? (victory ? 'Victory!' : 'Defeat!')
                    : (isPlayerTurn ? 'Your turn' : `${participantNames[game.turn]} is thinking…`)}
            </p>

            {game.platforms.map((platform, index) => {
                const name = index === 0 ? 'One' : 'Two';

                return (
                    <div className={`Platform${name}`} key={name}>
                        {platform.map((numPlaced, ind) => <h3 key={`${platform} ${numPlaced} ${ind}`}>{numPlaced}</h3>)}

                        <button
                            type="button"
                            className={`Plat${name}Button`}
                            disabled={!isPlayerTurn || selectedValue === null}
                            onClick={() => playSelectedValue(index)}
                        >
                            Place on platform {index + 1}
                        </button>
                    </div>
                );
            })}

            <div className="PlayerOptions">
                {game.hands[0].map((value) => (
                    <button
                        type="button"
                        className="valueButton"
                        key={value}
                        aria-pressed={selectedValue === value}
                        disabled={!isPlayerTurn}
                        onClick={() => setSelectedValue((current) => current === value ? null : value)}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <div className="Score">
                <h3>Penalty points</h3>

                {game.scores.map((score, index) => (
                    <p key={participantNames[index]}>{participantNames[index]}: {score}</p>
                ))}
            </div>

            <NextSceneButton destination="/game/stage2" buttonText="Return" />
        </div>
    );
}