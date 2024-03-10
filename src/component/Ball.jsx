import React, { useEffect, useRef, useState } from "react";
  // 1 -> row
  // -1 -> reverse row
  // 2 -> col
  // -2 -> rev col
  // 3 -> diagonal
  // -3 -> rev diagonal
  // 4 -> anti-diagonal />
  // -4 -> rev anti-diagonal </
const ROW_DIRECTION = 1;
const COL_DIRECTION = 2;
const DIAG_DIRECTION = 3;
const ANTI_DIAG_DIRECTION = 4;
const REVERSE_ROW_DIRECTION = -1;
const REVERSE_COL_DIRECTION = -2;
const REVERSE_DIAG_DIRECTION = -3;
const REVERSE_ANTI_DIAG_DIRECTION = -4;

function Ball({
  boardRef,
  changeCellColor,
  ballType,
  intital,
  changeCell,
  initMove,
}) {
  const [move, setMove] = useState(initMove);
  const [x, setX] = useState(intital.x);
  const [y, setY] = useState(intital.y);
  const [boardLimit, setBoardLimit] = useState({});
  const [ballLimit, setBallLimit] = useState({});
  const [cellBound, setCellBound] = useState({});
  const [currentCell, setCurrentCell] = useState({ i: 0, j: 0 });
  const ballRef = useRef(null);
  const style = { transform: `translate(${x}px,${y}px)` };
  const SPEED = 2;
  const getBound = (ref) => {
    if (!ref || !ref.current) return;
    const left = ref.current.offsetLeft;
    const top = ref.current.offsetTop;
    const right = left + ref.current.offsetWidth;
    const bottom = top + ref.current.offsetHeight;
    return { left, top, right, bottom };
  };

  useEffect(() => {
    setBallLimit(getBound(ballRef));
    if (boardRef) {
      setBoardLimit(getBound(boardRef));
      setCellBound({
        width: boardRef.current.offsetWidth / 20,
        height: boardRef.current.offsetHeight / 20,
      });
    }
  }, [boardRef]);

  const handleMove = () => {
    let offSet = move > 0 ? 1 : -1;
    switch (Math.abs(move)) {
      case ROW_DIRECTION:
        setX(x + offSet);
        break;
      case COL_DIRECTION:
        setY(y + offSet);
        break;
      case DIAG_DIRECTION:
        setX(x + offSet);
        setY(y + offSet);
        break;
      case ANTI_DIAG_DIRECTION:
        setX(x + offSet);
        setY(y - offSet);
        break;
    }
  };

  function handleRightCollision() {
    if (move === ROW_DIRECTION) {
      setMove(REVERSE_ROW_DIRECTION);
    } else if (move === DIAG_DIRECTION) {
      setMove(REVERSE_ANTI_DIAG_DIRECTION);
    } else if (ANTI_DIAG_DIRECTION) {
      setMove(REVERSE_DIAG_DIRECTION);
    }
  }

  function handleLeftCollision() {
    if (move === REVERSE_ROW_DIRECTION) {
      setMove(ROW_DIRECTION);
    } else if (move === REVERSE_ANTI_DIAG_DIRECTION) {
      setMove(DIAG_DIRECTION);
    } else if (REVERSE_DIAG_DIRECTION) {
      setMove(ANTI_DIAG_DIRECTION);
    }
  }

  function handleTopCollision() {
    if (move === REVERSE_COL_DIRECTION) {
      setMove(COL_DIRECTION);
    } else if (move === REVERSE_DIAG_DIRECTION) {
      setMove(REVERSE_ANTI_DIAG_DIRECTION);
    } else if (ANTI_DIAG_DIRECTION) {
      setMove(DIAG_DIRECTION);
    }
  }
  function handleBottomCollision() {
    if (move === COL_DIRECTION) {
      setMove(REVERSE_COL_DIRECTION);
    } else if (move === DIAG_DIRECTION) {
      setMove(ANTI_DIAG_DIRECTION);
    } else if (REVERSE_ANTI_DIAG_DIRECTION) {
      setMove(REVERSE_DIAG_DIRECTION);
    }
  }

  function handelCellCollision() {
    const currI = parseInt((x - boardLimit.left) / cellBound.width);
    const currJ = parseInt((y - boardLimit.top) / cellBound.height);
    const prevI = currentCell.i;
    const prevJ = currentCell.j;
    if(!currI || !currJ)return;
    setCurrentCell({
      i: currI,
      j: currJ,
    });
    if (!changeCell || !initMove) return;
    if (
      (currI === intital.x && currI == intital.y) ||
      currI < 0 ||
      currJ < 0 ||
      currJ >= 20 ||
      currI >= 20
    )
      return;

    if (changeCell[currI][currJ] === ballType) return;

    if (prevI < currI && prevJ < currJ) {
      // diagonal next cell
      setMove(REVERSE_ANTI_DIAG_DIRECTION);
    } else if (prevI > currI && prevJ > currJ) {
      // diagonal next cell
      setMove(ANTI_DIAG_DIRECTION);
    } else if (prevI < currI && prevJ > currJ) {
      // anti diagonal prev cell
      setMove(DIAG_DIRECTION);
    } else if (prevI > currI && prevJ < currJ) {
      // anti diagonal next cell
      setMove(REVERSE_DIAG_DIRECTION);
    } else if (prevI == currI) {
      // same row
      if (prevJ < currJ) handleRightCollision();
      else handleLeftCollision();
    } else if (prevJ == currJ) {
      // same column
      if (prevI < currI) handleBottomCollision();
      else handleTopCollision();
    }
    changeCellColor(currI, currJ);
  }
  useEffect(() => {
    setTimeout(() => {
      if (!ballRef || !ballRef.current || !ballLimit) return;
      const left = x + ballLimit.left;
      const top = y + ballLimit.top;
      const right = x + ballRef.current.offsetWidth;
      const bottom = y + ballRef.current.offsetHeight;
      if (right > boardLimit.right) {
        handleRightCollision();
      } else if (left < boardLimit.left) {
        handleLeftCollision();
      } else if (top < boardLimit.top) {
        handleTopCollision();
      } else if (bottom > boardLimit.bottom) {
        handleBottomCollision();
      } else {
        handelCellCollision();
        handleMove();
      }
    }, SPEED);
  }, [x, y, currentCell]);

  useEffect(() => {
    handleMove();
  }, [move]);

  return (
    <div
      className={`ball ${ballType ? "day" : "night"}`}
      style={style}
      ref={ballRef}
    ></div>
  );
}

export default Ball;
