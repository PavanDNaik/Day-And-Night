import React, { useEffect, useRef, useState } from "react";

const getBound = (ref) => {
  const left = ref.current.offsetLeft;
  const top = ref.current.offsetTop;
  const right = left + ref.current.offsetHeight;
  const bottom = top + ref.current.offsetWidth;
  return { left, top, right, bottom };
};

function Ball({ boardRef }) {
  const [move, setMove] = useState(3);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [boardLimit, setBoardLimit] = useState({});
  const ballRef = useRef(null);
  const style = { transform: `translate(${x}px,${y}px)` };

  useEffect(() => {
    setBoardLimit(getBound(boardRef));
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
      const left = x;
      const top = y;
      const right = x + ballRef.current.offsetWidth;
      const bottom = y + ballRef.current.offsetHeight;

      if (right > boardLimit.right) {
        if (move == 3) {
          setMove(-4);
        } else {
          setMove(-1);
        }
      } else if (left < boardLimit.left) {
        if (move == 3 || move == -3) {
          //   setMove(-1 * move);
        } else {
          setMove(1);
        }
      } else if (top < boardLimit.top) {
        if (move == 3 || move == -3) {
          //   setMove(-1 * move);
        } else {
          setMove(2);
        }
      } else if (bottom > boardLimit.bottom) {
        if (move == 3) {
          setMove(-4);
        } else {
          setMove(-2);
        }
      }
      //   handleMove();
    }, 1);
  }, [x, y, move]);
  return <div className="ball" style={style} ref={ballRef}></div>;
}

export default Ball;
