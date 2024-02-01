import React, { useEffect, useRef, useState } from "react";

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
  const SPEED = 5;
  const getBound = (ref) => {
    if (!ref || !ref.current) return;
    const left = ref.current.offsetLeft;
    const top = ref.current.offsetTop;
    const right = ref.current.offsetHeight;
    const bottom = ref.current.offsetWidth;
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
      case 1:
        setX(x + offSet);
        break;
      case 2:
        setY(y + offSet);
        break;
      case 3:
        setX(x + offSet);
        setY(y + offSet);
        break;
      case 4:
        setX(x + offSet);
        setY(y - offSet);
        break;
    }
  };

  // 1 -> row
  // -1 -> reverse row
  // 2 -> col
  // -2 -> rev col
  // 3 -> diagonal
  // -3 -> rev diagonal
  // 4 -> anti-diagonal />
  // -4 -> rev anti-diagonal </
  function handleRightCollision() {
    if (move === 1) {
      setMove(-1);
    } else if (move === 3) {
      setMove(-4);
    } else if (4) {
      setMove(-3);
    }
  }

  function handleLeftCollision() {
    if (move === -1) {
      setMove(1);
    } else if (move === -4) {
      setMove(3);
    } else if (-3) {
      setMove(4);
    }
  }

  function handleTopCollision() {
    if (move === -2) {
      setMove(2);
    } else if (move === -3) {
      setMove(-4);
    } else if (4) {
      setMove(3);
    }
  }
  function handleBottomCollision() {
    if (move === 2) {
      setMove(-2);
    } else if (move === 3) {
      setMove(4);
    } else if (-4) {
      setMove(-3);
    }
  }

  function handelCellCollision() {
    if (!(cellBound.width && cellBound.height)) return;
    const currI = parseInt((x + ballLimit.right) / cellBound.width);
    const currJ = parseInt((y + ballLimit.bottom) / cellBound.height);
    const prevI = currentCell.i;
    const prevJ = currentCell.j;
    setCurrentCell({
      i: currI,
      j: currJ,
    });
    if (changeCell[currI][currJ] === ballType) return;
    if (
      (currI === intital.x && currI == intital.y) ||
      currI < 0 ||
      currJ < 0 ||
      currJ >= 20 ||
      currI >= 20
    )
      return;
    if (prevI === currI && prevJ === currJ) return;

    if (prevI < currI && prevJ < currJ) {
      // diagonal next cell
      setMove(-4);
    } else if (prevI > currI && prevJ > currJ) {
      // diagonal next cell
      setMove(4);
    } else if (prevI < currI && prevJ > currJ) {
      // anti diagonal prev cell
      setMove(3);
    } else if (prevI > currI && prevJ < currJ) {
      // anti diagonal next cell
      setMove(-3);
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
