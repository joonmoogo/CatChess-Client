

export default function Winning(){
    const buttonStyle = {
        color: 'white',
        border: '4px solid white',
        height: '0%',
        width:'50px',
        borderRadius:'100px',
        textAlign:'center',
        background:'white',
    }

    const textStyle = {
        // textAlign:'center',
        // position:'absolute',
        color:'black',
        marginBottom:'1px'
    }

    function reloadHandler(event) {
        console.log('Reload button was clicked');
    }

    return (
        <>
            <div style={buttonStyle} onClick={reloadHandler}>
            <div style={textStyle}>🔥6</div>
            </div>
        </>
    )
}