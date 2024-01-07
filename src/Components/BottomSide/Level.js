import React, { useEffect, useState } from "react";

export default function Level({ level }) {
  const [progressValue, setProgressValue] = useState(10);
  const [maxValue,setMaxValue] = useState(20);

  const buttonStyle = {
    color: "white",
    border: "1px solid white",
    // height: "50%",
  };

  const progressBarStyle = {
    width: "65%",
  };

  const valueTextStyle = {
    marginLeft: "8px",
    color: "white",
    
  };

  return (
    <div style={buttonStyle}>
      <div style={{color:'white'}}>
        Level{level}
      </div>
      <progress value={progressValue} max={maxValue} style={progressBarStyle} /> 
      <span style={valueTextStyle}>{progressValue}/{maxValue}</span>
    </div>
  );
}
