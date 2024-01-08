export default function Reload() {
    const buttonStyle={
        color:'white',
        border:'1px solid white',
        height:'50%',
        cursor:'pointer',
        userSelect:'none',   
     }

    function reloadHandler(event){
        console.log('Reload button was clicked');
    }
    return (
        <div style={buttonStyle} onClick={reloadHandler}>Reload</div>
    )
}