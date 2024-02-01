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
  const [changeCell, setChangeCell] = useState([]);
  const [grid, setGrid] = useState([]);
  const boardRef = useRef(null);
  // const cellRef = useRef(null);
  useEffect(() => {
    for (let i = 0; i < 20; i++) {
      changeCell.push([]);
      for (let j = 0; j < 20; j++) {
        changeCell[i].push(false);
      }
    }
    setChangeCell([...changeCell]);
    setGrid(getGrid());
  }, []);
  const changeCellColor = (i, j) => {
    changeCell[i][j] = true;
    setChangeCell([...changeCell]);
  };
  return (
    <>
      <Ball boardRef={boardRef} changeCellColor={changeCellColor} />
      <div className="board-container" ref={boardRef}>
        {grid.map((row, i) => {
          return (
            <div className="grid-row" key={i}>
              {row.map((cell, j) => {
                return changeCell && changeCell[j][i] ? (
                  <Cell key={`${i}-${j}`} i={i} j={j} changeColor={true} />
                ) : (
                  <Cell key={`${i}-${j}`} i={i} j={j} changeColor={false} />
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
