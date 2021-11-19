import React from "react";
import "./CounterValue.css";

// A simple functional component to show the current counter value
const CounterValue = ({count}) => {
  return <span id="counterValue">Counter value : {count >= 0 ? count : ''}</span>;
};

export default CounterValue;
