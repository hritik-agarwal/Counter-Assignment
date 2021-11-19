import React from "react";
import "./CurrentCount.css";

const CurrentCount = ({count}) => {
  return <span id="currentCount">Counter value : {count >= 0 ? count : ''}</span>;
};

export default CurrentCount;
