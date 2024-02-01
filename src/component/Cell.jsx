import React, { useState } from "react";

function Cell({ i, j, changeColor }) {
  const style = { backgroundColor: changeColor ? "green" : "red" };
  return <div className="cell" style={style}></div>;
}

export default Cell;
