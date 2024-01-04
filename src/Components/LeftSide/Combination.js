export default function Combination() {
    const combinationStyle = {
        border: '1px solid white',
        borderRadius: '100px',
        width: '50px',
        height: '50px',
        marginBottom: '20px',
        color:'white',


    }
    return (
        <>
            {[1, 2, 3, 4, 5].map((e,i) => {
                return (
                    <div key={i} style={combinationStyle}>
                        <div id="image">combi</div>
                        <div id="blood">{Math.round(Math.random() * 100 + 1)}</div>
                    </div>
                )
            })}
        </>
    )
}