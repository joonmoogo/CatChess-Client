export default function CharacterCard({shop}) {
    const cardStyle={
        border:'1px solid white',
        color:'white',
        height:'100%',
        width:'20%'
    }
    return (
        <div style={cardStyle}>{shop?.name}</div>
    )
}