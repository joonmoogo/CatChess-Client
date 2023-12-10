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
    color: "black",
    textAlign: "center",
    boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
    transform: `scale(${scaleRatio})`,
    transformOrigin: "bottom left",
  };

  return (
    <div style={bottomSideStyle}>
      <BuyXP />
      <CharacterCard />
      <Reload />
    </div>
  );
}
