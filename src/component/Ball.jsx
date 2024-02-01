import React, { useEffect, useRef, useState } from "react";
const SPEED = 50;
const getBound = (ref) => {
  const left = ref.current.offsetLeft;
  const top = ref.current.offsetTop;
  const right = ref.current.offsetHeight;
  const bottom = ref.current.offsetWidth;
  return { left, top, right, bottom };
};

function Ball({ boardRef }) {
  const [move, setMove] = useState(3);
  const [x, setX] = useState(47);
  const [y, setY] = useState(6);
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
  }, []);

  useEffect(() => {
    if (cellBound.width && cellBound.height) {
      const currI = parseInt((x + ballLimit.right) / cellBound.width);
      const currJ = parseInt((y + ballLimit.bottom) / cellBound.height);
      if (currentCell.i !== currI || currentCell.j !== currJ) {
        setCurrentCell({
          i: currI,
          j: currJ,
        });
      }
    }
  }, [cellBound, x, y]);
  useEffect(() => {
    console.log(currentCell);
  }, [currentCell]);
  const handleMove = () => {
    let offSet = move > 0 ? 2 : -2;
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
  // 4 -> anti-diagonal
  // -4 -> rev anti-diagonal
  function handleRightCollision() {
    if (move === 1) {
      setMove(-1);
    } else if (move === 3) {
      setMove(-4);
    } else {
      setMove(-3);
    }
  }

  function handleLeftCollision() {
    if (move === -1) {
      setMove(1);
    } else if (move === -4) {
      setMove(3);
    } else {
      setMove(4);
    }
  }

  function handleTopCollision() {
    if (move === -2) {
      setMove(2);
    } else if (move === -3) {
      setMove(-4);
    } else {
      setMove(3);
    }
  }
  function handleBottomCollision() {
    if (move === 2) {
      setMove(-2);
    } else if (move === 3) {
      setMove(4);
    } else {
      setMove(-3);
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
        // handleMove();
      }
    }, SPEED);
  }, [x, y]);

  useEffect(() => {
    // handleMove();
  }, [move]);

  return <div className="ball" style={style} ref={ballRef}></div>;
}

export default Ball;
