import react from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatureCardActions } from '../../store/CreatureCardSlice';
import TableSlot from './TableSlot';
import './Table.css';
import '../CardsList';

function Table(props) {
  const TablePositions = useSelector((state) => state.table);

  return (
    <div id="Table">
      <div id="Player1TableSide">
        <TableSlot
          creature={TablePositions?.player1side[0]}
          space={0}
          className="player1side"
          handSide="player1hand"
        />
        <TableSlot
          creature={TablePositions?.player1side[1]}
          space={1}
          className="player1side"
          handSide="player1hand"
        />
        <TableSlot
          creature={TablePositions?.player1side[2]}
          space={2}
          className="player1side"
          handSide="player1hand"
        />
        <TableSlot
          creature={TablePositions?.player1side[3]}
          space={3}
          className="player1side"
          handSide="player1hand"
        />
      </div>
      <div id="Player2TableSide">
        <TableSlot
          creature={TablePositions?.player2side[0]}
          space={0}
          className="player2side"
          handSide="player2hand"
        />
        <TableSlot
          creature={TablePositions?.player2side[1]}
          space={1}
          className="player2side"
          handSide="player2hand"
        />
        <TableSlot
          creature={TablePositions?.player2side[2]}
          space={2}
          className="player2side"
          handSide="player2hand"
        />
        <TableSlot
          creature={TablePositions?.player2side[3]}
          space={3}
          className="player2side"
          handSide="player2hand"
        />
      </div>
    </div>
  );
}

export default Table;
