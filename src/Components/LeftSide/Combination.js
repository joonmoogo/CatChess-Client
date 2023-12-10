export default function Combination() {
    const combinationStyle = {
        border: '1px solid black',
        borderRadius: '100px',
        width: '50px',
        height: '50px',
        marginBottom: '20px'

    }
    return (
        <>
            {[1, 2, 3, 4, 5].map((e) => {
                return (
                    <div style={combinationStyle}>
                        <div id="image">combi</div>
                        <div id="blood">{Math.round(Math.random() * 100 + 1)}</div>
                    </div>
                )
            })}

        </>
    )
}