import { Socket } from "../../Util/Socket/Socket";

export default function BuyXP() {

    const buttonStyle={
        color:'white',
        border:'1px solid white',
        height:'50%',
        cursor:'pointer',
        userSelect:'none',
    }
    function buyXPHandler(event){
        console.log('buyXP button was clicked');
        Socket.sendMsg("reqBuyExp", "");
        
    }

    return (
        <div style={buttonStyle} onClick={buyXPHandler}>BuyXP</div>
    )
}