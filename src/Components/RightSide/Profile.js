export default function Profile() {
    const profileStyle = {
        border: '1px solid white',
        color:'white',
        borderRadius: '100px',
        width: '50px',
        height: '50px',
        marginBottom: '20px'

    }
    return (
        <>
            {[1, 2, 3, 4, 5].map((e) => {
                return (
                    <div style={profileStyle}>
                        <div id="image">profile</div>
                        <div id="blood">{Math.round(Math.random() * 100 + 1)}</div>
                    </div>
                )
            })}

        </>
    )
}