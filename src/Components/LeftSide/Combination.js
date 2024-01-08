export default function Combination() {
    const combinationStyle = {
        border: '1px solid white',
        borderRadius: '100px',
        width: '50px',
        height: '50px',
        marginBottom: '20px',
        color: 'white',


    }
    return (
        <>
            <div style={combinationStyle}>
                <div id="image">Heal</div>
                <div id="blood">{Math.round(Math.random() * 100 + 1)}</div>
            </div>
        </>
    )
}