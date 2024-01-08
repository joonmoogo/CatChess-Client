export default function Money({ money }) {
    const buttonStyle = {
        color: 'white',
        borderBottom: '25px solid white',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        height: '0%',
        width:'50px',
        
    }

    const textStyle = {
        textAlign:'center',
        position:'absolute',
        color:'black'
    }

    function reloadHandler(event) {
        console.log('Reload button was clicked');
    }

    return (
        <>
            <div style={buttonStyle} onClick={reloadHandler}>
            <div style={textStyle}>💽{money}100</div>
            </div>
        </>
    )
}
