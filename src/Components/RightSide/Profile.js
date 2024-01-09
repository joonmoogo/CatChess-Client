import { useEffect, useState } from "react"

export default function Profile({player}) {
    const profileStyle = {
        border: '1px solid white',
        color: 'white',
        borderRadius: '100px',
        width: '60px',
        height: '50px',
        marginBottom: '20px'

    }

    const imageStyle={
        color:'white'
    }

    const myImageStyle={
        color:'pink'
    }

    const [id,setId] = useState(localStorage.getItem('id'));

    return (
        <>
            <div style={profileStyle}>
                <div style={id==player?myImageStyle:imageStyle} id="image">{player}</div>
                <div id="blood">{}100</div>
            </div>
        </>
    )
}