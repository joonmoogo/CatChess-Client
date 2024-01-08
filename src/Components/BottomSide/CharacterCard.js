import { Socket } from "../../Util/Socket/Socket"

export default function CharacterCard({shop}) {
    const cardStyle={
        border:'1px solid white',
        color:'white',
        height:'100%',
        width:'20%',
        userSelect:'none',
        cursor:'pointer',
    }

    const handleButtonClick = (event) =>{
        console.log('characterCard is clicked');
        // Socket.sendMsg('')
    }
    return (
        <div onClick={handleButtonClick} style={cardStyle}>{shop?.name}</div>
    )
}