import Profile from "./Profile"
export default function RightSide({ windowWidth, windowHeight }) {
    const scaleRatio = 1;
    const width = 100;

    const rightSideStyle = {
        position: "fixed",
        top: '50%',
        right: 0,
        width: `${width}px`,
        height: `${windowHeight/2}px`,
        marginTop: `-${windowHeight / 4}px`,
        padding: "10px",
        backgroundColor:'white',
        color: "black",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transform: `scale(${scaleRatio})`,
        transformOrigin: "top right",
    };

    return (
        <div style={rightSideStyle}>
            <Profile />
        </div>
    )
}