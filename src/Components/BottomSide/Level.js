import React, { useEffect, useState } from "react";

export default function Level({ level,exp }) {
    

  const buttonStyle = {
    color: "white",
    border: "1px solid white",
    userSelect:'none',
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
        Level {level}
      </div>
      <progress value={exp?.exp} max={exp?.maxExp} style={progressBarStyle} /> 
      <span style={valueTextStyle}>{exp?.exp}/{exp?.maxExp}</span>
    </div>
  );
}
