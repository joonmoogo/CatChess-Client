export default function CharacterCard(props) {
    const cardStyle={
        border:'1px solid white',
        color:'white',
        height:'100%',
        width:'20%'
    }
    return (
        <div style={cardStyle} onClick={props.onClick}>CharacterCard</div>
    )
}