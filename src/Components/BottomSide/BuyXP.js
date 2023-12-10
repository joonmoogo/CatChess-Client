export default function BuyXP() {

    function buyXPHandler(event){
        console.log('buyXP button was clicked');
    }

    return (
        <button onClick={buyXPHandler}>BuyXP</button>
    )
}