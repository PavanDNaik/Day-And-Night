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
const getRandom = () => {
  let a = [1, 3, 4];
  return a[Math.round(Math.random() * 2)];
};

const getBound = (ref) => {
  if (!ref || !ref.current) return;
  const left = ref.current.offsetLeft;
  const top = ref.current.offsetTop;
  const right = ref.current.offsetWidth;
  const bottom = ref.current.offsetHeight;
  return { left, top, right, bottom };
};

function GameBoard() {
  const [changeCell, setChangeCell] = useState([]);
  const [day, setDay] = useState(200);
  const [night, setNight] = useState(200);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(false);
  const boardRef = useRef(null);
  const [bound, setBound] = useState({});
  // const cellRef = useRef(null);
  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      changeCell.push([]);
      for (let j = 0; j < 20; j++) {
        changeCell[i].push(false);
      }
    }
    for (let i = 10; i < 20; i++) {
      changeCell.push([]);
      for (let j = 0; j < 20; j++) {
        changeCell[i].push(true);
      }
    }
    setChangeCell([...changeCell]);
    setGrid(getGrid());
    setBound(getBound(boardRef));
  }, []);

  const changeCellToDay = (i, j) => {
    changeCell[i][j] = true;
    setDay(day + 1);
    setNight(night - 1);
    setChangeCell([...changeCell]);
  };

  const changeCellToNight = (i, j) => {
    changeCell[i][j] = false;
    setDay(day - 1);
    setNight(night + 1);
    setChangeCell([...changeCell]);
  };
  return (
    <>
      {start && (
        <>
          <Ball
            boardRef={boardRef}
            changeCellColor={changeCellToDay}
            key={"day"}
            ballType={true}
            intital={{
              x: bound.left + bound.right - 45,
              y: bound.top + bound.bottom / 2,
            }}
            changeCell={changeCell}
            initMove={getRandom()}
          />
          <Ball
            boardRef={boardRef}
            changeCellColor={changeCellToNight}
            key={"night"}
            ballType={false}
            intital={{
              x: bound.left + 50,
              y: bound.top + bound.bottom / 2,
            }}
            changeCell={changeCell}
            initMove={getRandom() * -1}
          />
        </>
      )}
      <span className="board-container" ref={boardRef}>
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
      </span>
      <span className="right-container">
        <button className="startButton" onClick={() => setStart(!start)}>
          {start ? "stop" : "start"}
        </button>
        <span className="score">
          <span className="day-score">{day}</span>||
          <span className="night-score">{night}</span>
        </span>
      </span>
    </>
  );
}

export default GameBoard;
