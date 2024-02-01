import React, { useEffect, useRef, useState } from "react";
const SPEED = 5;
const getBound = (ref) => {
  const left = ref.current.offsetLeft;
  const top = ref.current.offsetTop;
  const right = ref.current.offsetHeight;
  const bottom = ref.current.offsetWidth;
  return { left, top, right, bottom };
};

const allowed = [];

function Ball({ boardRef, changeCellColor }) {
  const [move, setMove] = useState(4);
  const [x, setX] = useState(110);
  const [y, setY] = useState(110);
  const [boardLimit, setBoardLimit] = useState({});
  const [ballLimit, setBallLimit] = useState({});
  const [cellBound, setCellBound] = useState({});
  const [currentCell, setCurrentCell] = useState({ i: 0, j: 0 });
  const ballRef = useRef(null);
  const style = { transform: `translate(${x}px,${y}px)` };

  useEffect(() => {
    setBallLimit(getBound(ballRef));
    setBoardLimit(getBound(boardRef));
    setCellBound({
      width: boardRef.current.offsetWidth / 20,
      height: boardRef.current.offsetHeight / 20,
    });
    for (let i = 0; i < 20; i++) {
      allowed.push([]);
      for (let j = 0; j < 20; j++) {
        allowed[i].push(false);
      }
    }
  }, []);

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
    if (currI >= 20 || currJ >= 20 || allowed[currI][currJ]) return;
    if (prevI === currI && prevJ === currJ) return;
    allowed[currI][currJ] = true;
    changeCellColor(currI, currJ);

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
      if (prevJ < currJ) handleRightCollision();
      else handleLeftCollision();
    } else if (prevJ == currJ) {
      if (prevI < currI) handleBottomCollision();
      else handleTopCollision();
    }
  }
  useEffect(() => {
    setTimeout(() => {
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
  }, [x, y]);

  useEffect(() => {
    handleMove();
  }, [move]);

  return <div className="ball" style={style} ref={ballRef}></div>;
}

export default Ball;
