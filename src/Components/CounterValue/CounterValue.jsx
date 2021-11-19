import React from "react";
import "./CounterValue.css";

const CounterValue = ({count}) => {
  return <span id="counterValue">Counter value : {count >= 0 ? count : ''}</span>;
};

export default CounterValue;
