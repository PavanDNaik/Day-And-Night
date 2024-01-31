import React, { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import Ball from "./Ball";
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
  const boardRef = useRef(null);
  // const cellRef = useRef(null);
  useEffect(() => {
    // setCol(col+1);
    // console.log(boardRef.current.offsetLeft);
    // console.log(boardRef.current.offsetTop);
    // console.log(boardRef.current.offsetHeight);
    // console.log(boardRef.current.offsetWidth);
  }, []);
  return (
    <>
      <Ball boardRef={boardRef} />
      <div className="board-container" ref={boardRef}>
        {grid.map((row, i) => {
          return (
            <div className="grid-row" key={i}>
              {row.map((cell, j) => {
                return (
                  <Cell
                    key={`${i}-${j}`}
                    i={i}
                    j={j}
                    row={curRow}
                    col={curCol}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default GameBoard;
