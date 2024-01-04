export default function BuyXP({exp}) {

    const buttonStyle={
        color:'white',
        border:'1px solid white',
        height:'50%'
    }
    function buyXPHandler(event){
        console.log('buyXP button was clicked');
    }

    return (
        <div style={buttonStyle} onClick={buyXPHandler}>BuyXP {exp}</div>
    )
}