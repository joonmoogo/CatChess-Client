export default function BuyXP() {

    const buttonStyle={
        color:'white',
        border:'1px solid white'
    }
    function buyXPHandler(event){
        console.log('buyXP button was clicked');
    }

    return (
        <div style={buttonStyle} onClick={buyXPHandler}>BuyXP</div>
    )
}