

export default function Winning({winning,losing}){
    const buttonStyle = {
        color: 'white',
        border: '1px solid white',
        height: '0%',
        width:'50px',
        borderRadius:'10px',
        textAlign:'center',
        background:'white',
        userSelect:'none',
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
            <div style={textStyle}>
                {winning&&winning!=0?<div>🔥{winning}</div>:null}
                {losing&&losing!=0?<div>😭{losing}</div>:null}
            </div>
            </div>
        </>
    )
}