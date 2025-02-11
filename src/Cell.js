import React from 'react';

function Cell({ row, col, revealed, flagged, mine, adjacentMines, onClick, onRightClick }) {
  return (
    <div
      className={`cell ${revealed ? 'revealed' : ''} ${flagged ? 'flagged' : ''}`}
      onClick={() => onClick(row, col)}
      onContextMenu={(e) => onRightClick(e, row, col)}
    >
      {revealed && (mine ? '💣' : adjacentMines)}
    </div>
  );
}

export default Cell;
