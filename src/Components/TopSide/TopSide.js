import Timer from "./Timer";

export default function TopSide({ windowWidth, windowHeight }) {
  const scaleRatio = 1;
  const height = 50;

  const topSideStyle = {
    position: "fixed",
    top: 0,
    left: "50%",
    width: `${windowWidth / 2}px`,
    height: `${height * scaleRatio}px`,
    marginLeft: `-${windowWidth / 4}px`,
    padding: "10px",
    // backgroundColor:'white',
    color: "white",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transform: `scale(${scaleRatio})`,
    transformOrigin: "top left",
  };

  return (
    <div style={topSideStyle}>
      <Timer />
    </div>
  );
}
