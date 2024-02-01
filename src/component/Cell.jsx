import React, { useState } from "react";

function Cell({ i, j, changeColor }) {
  const style = { backgroundColor: changeColor ? "#064e3b" : "#dcfce7" };
  return <div className="cell" style={style}></div>;
}

export default Cell;
