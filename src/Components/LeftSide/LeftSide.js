import Combination from "./Combination";

export default function LeftSide({ windowWidth, windowHeight }) {
  const scaleRatio = 1;
  const widthRatio = 0.1;
  const width = 100;

  const leftSideStyle = {
    position: "fixed",
    top: "50%",
    left: 0,
    width: `${width}px`,
    height: `${windowHeight / 2}px`,
    marginTop: `-${windowHeight / 4}px`,
    padding: "10px",
    color: "black",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transform: `scale(${scaleRatio})`,
    transformOrigin: "top left",
  };

  return (
    <div style={leftSideStyle}>
      <Combination />
    </div>
  );
}
