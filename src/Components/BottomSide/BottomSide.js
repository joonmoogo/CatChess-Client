import { useEffect } from "react";
import BuyXP from "./BuyXP";
import CharacterCard from "./CharacterCard";
import Reload from "./Reload";

export default function BottomSide({ windowWidth, windowHeight }) {
    
  const scaleRatio = 1;
  const height = 100;

  const bottomSideStyle = {
    position: "fixed",
    bottom: 0,
    left: "50%",
    width: `${windowWidth / 2}px`,
    height: `${height}px`,
    marginLeft: `-${windowWidth / 4}px`,
    padding: "10px",
    // backgroundColor:'white',
    color: "black",
    boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
    transform: `scale(${scaleRatio})`,
    transformOrigin: "bottom left",
  };

  const stackBoxStyle = {
    border: "1px solid #ccc",
    width: '20%',
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  };

  const characterCardContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align items to the top
    marginTop: "10px",
  };

  return (
    <div style={bottomSideStyle}>
      <div style={stackBoxStyle}>
        <BuyXP/>
        <Reload />
      </div>
      <div style={characterCardContainerStyle}>
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
      </div>
    </div>
  );
}
