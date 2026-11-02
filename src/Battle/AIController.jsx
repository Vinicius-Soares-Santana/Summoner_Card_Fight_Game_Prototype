import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DifficultyPresets } from '../assets/EnemiesList';
import { runAIStep } from './chooseAIAction';

export default function AIController() {
  const dispatch = useDispatch();
  const battle = useSelector((state) => state.battle);
  const playerId = useSelector((state) => state.turn.sideTurn);
  const controller = battle.participants[playerId]?.controller;
  const delay = DifficultyPresets[controller?.difficulty]?.delay ?? 700;

  useEffect(() => {
    if (battle.status !== 'playing' || battle.resolving || controller?.type !== 'ai') return;
    const timer = setTimeout(() => {
      dispatch(runAIStep({ id: battle.id, revision: battle.revision }));
    }, delay);
    return () => clearTimeout(timer);
  }, [dispatch, battle.id, battle.revision, battle.status, battle.resolving,
    controller?.type, delay]);

  if (battle.error) return <p role="alert">Fight Stopped, error: {battle.error}</p>;
  return null;
}
