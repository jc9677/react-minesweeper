import React, { useState, useEffect } from 'react';

function Game() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [mines, setMines] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [flags, setFlags] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('minesweeperState'));
    if (savedState) {
      setRows(savedState.rows);
      setCols(savedState.cols);
      setMines(savedState.mines);
      setRevealed(savedState.revealed);
      setFlags(savedState.flags);
      setGameOver(savedState.gameOver);
      setGameWon(savedState.gameWon);
    } else {
      resetGame();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('minesweeperState', JSON.stringify({
      rows,
      cols,
      mines,
      revealed,
      flags,
      gameOver,
      gameWon
    }));
  }, [rows, cols, mines, revealed, flags, gameOver, gameWon]);

  const resetGame = () => {
    const newMines = generateMines(rows, cols);
    setMines(newMines);
    setRevealed([]);
    setFlags([]);
    setGameOver(false);
    setGameWon(false);
  };

  const generateMines = (rows, cols) => {
    const mines = [];
    for (let i = 0; i < rows; i++) {
      mines.push([]);
      for (let j = 0; j < cols; j++) {
        mines[i].push(Math.random() < 0.2);
      }
    }
    return mines;
  };

  const handleCellClick = (row, col) => {
    if (gameOver || gameWon || revealed.includes(`${row},${col}`) || flags.includes(`${row},${col}`)) {
      return;
    }

    if (mines[row][col]) {
      setGameOver(true);
    } else {
      const newRevealed = [...revealed, `${row},${col}`];
      setRevealed(newRevealed);

      if (newRevealed.length === rows * cols - mines.flat().filter(Boolean).length) {
        setGameWon(true);
      }
    }
  };

  const handleCellRightClick = (e, row, col) => {
    e.preventDefault();
    if (gameOver || gameWon || revealed.includes(`${row},${col}`)) {
      return;
    }

    const newFlags = flags.includes(`${row},${col}`)
      ? flags.filter(flag => flag !== `${row},${col}`)
      : [...flags, `${row},${col}`];
    setFlags(newFlags);
  };

  const handleGridSizeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rows') {
      setRows(Number(value));
    } else if (name === 'cols') {
      setCols(Number(value));
    }
    resetGame();
  };

  return (
    <div className="Game">
      <div className="controls">
        <label>
          Rows:
          <input type="number" name="rows" value={rows} onChange={handleGridSizeChange} />
        </label>
        <label>
          Columns:
          <input type="number" name="cols" value={cols} onChange={handleGridSizeChange} />
        </label>
        <button onClick={resetGame}>New Game</button>
      </div>
      <div className="grid">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: cols }).map((_, col) => (
              <div
                key={col}
                className={`cell ${revealed.includes(`${row},${col}`) ? 'revealed' : ''} ${flags.includes(`${row},${col}`) ? 'flagged' : ''}`}
                onClick={() => handleCellClick(row, col)}
                onContextMenu={(e) => handleCellRightClick(e, row, col)}
              >
                {revealed.includes(`${row},${col}`) && (mines[row][col] ? '💣' : countAdjacentMines(row, col))}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <div className="game-over">Game Over</div>}
      {gameWon && <div className="game-won">You Won!</div>}
    </div>
  );
}

const countAdjacentMines = (row, col, mines) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (mines[row + i] && mines[row + i][col + j]) {
        count++;
      }
    }
  }
  return count;
};

export default Game;
