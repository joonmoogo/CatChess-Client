import { Socket } from "../../Util/Socket/Socket"

export default function CharacterCard({ shop,onClick }) {
    const cardStyle = {
        border: '1px solid white',
        color: 'white',
        height: '100%',
        width: '20%',
        userSelect: 'none',
        cursor: 'pointer',
    }

    const textStyle = {
        position: 'absolute',
        color: 'black',
        fontWeight: 'bold',
    }

    const imgStyle = {
        width: '100%',
        height: '100%',
    }

    return (
        <>
        
            <div onClick={onClick} style={cardStyle}>
                <div style={textStyle} >{shop?.name}
                    <div>💰{shop?.cost}</div>
                </div>
                <img style={imgStyle} src={`/Cat-illustration/${shop?.id}.png`} alt="sold"></img>
            </div>
        </>
    )
}