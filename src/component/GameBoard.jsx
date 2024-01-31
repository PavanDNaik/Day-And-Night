import React, { useEffect, useState } from "react";
import Cell from "./Cell";
const GRID_LENGTH = 20;
const getGrid = () => {
  const grid = [];
  for (let i = 0; i < GRID_LENGTH; i++) {
    grid.push([]);
    for (let j = 0; j < GRID_LENGTH; j++) {
      grid[i].push({ i, j });
    }
  }
  return grid;
};
function GameBoard() {
  const [curRow, setcurRow] = useState(0);
  const [curCol, setcurCol] = useState(0);
  const [grid, setGrid] = useState(getGrid());

  useEffect(() => {
    // setCol(col+1);
  }, []);
  return (
    <div className="board-container">
      {grid.map((row, i) => {
        return (
          <div className="grid-row" key={i}>
            {row.map((cell, j) => {
              return (
                <Cell key={`${i}-${j}`} i={i} j={j} row={curRow} col={curCol} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;
