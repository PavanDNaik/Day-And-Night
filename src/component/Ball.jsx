import React, { useEffect, useRef, useState } from "react";

const getBound = (ref) => {
  const left = ref.current.offsetLeft;
  const top = ref.current.offsetTop;
  const right = left + ref.current.offsetHeight;
  const bottom = top + ref.current.offsetWidth;
  return { left, top, right, bottom };
};

function Ball({ boardRef }) {
  const [move, setMove] = useState(4);
  const [x, setX] = useState(201);
  const [y, setY] = useState(300);
  const [boardLimit, setBoardLimit] = useState({});
  const [ballLimit, setBallLimit] = useState({});
  const ballRef = useRef(null);
  const style = { transform: `translate(${x}px,${y}px)` };

  useEffect(() => {
    setBoardLimit(getBound(boardRef));
    setBallLimit(getBound(ballRef));
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
  useEffect(() => {
    setTimeout(() => {
      const left = x + ballLimit.left;
      const top = y + ballLimit.top;
      const right = x + ballRef.current.offsetWidth;
      const bottom = y + ballRef.current.offsetHeight;
      if (right > boardLimit.right) {
        if (move == 1) {
          setMove(-1);
        } else if (move == 3) {
          setMove(-4);
        } else {
          setMove(-3);
        }
      } else if (left < boardLimit.left) {
        if (move == -1) {
          setMove(1);
        } else if (move == -4) {
          setMove(3);
        } else {
          setMove(4);
        }
      } else if (top < boardLimit.top) {
        if (move == -2) {
          setMove(2);
        } else if (move == -3) {
          setMove(-4);
        } else {
          setMove(3);
        }
      } else if (bottom > boardLimit.bottom) {
        if (move == 2) {
          setMove(-2);
        } else if (move == 3) {
          setMove(4);
        } else {
          setMove(-3);
        }
      } else {
        handleMove();
      }
    }, 1);
  }, [x, y]);
  useEffect(() => {
    handleMove();
  }, [move]);
  return <div className="ball" style={style} ref={ballRef}></div>;
}

export default Ball;
