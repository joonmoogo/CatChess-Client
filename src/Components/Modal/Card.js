export default function Card({name, content, onClick}) {
    const cardStyle = {
        width: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    };

    const titleStyle = {
        color: '#333',
        fontSize: '1.5em',
        marginBottom: '10px',
    };

    const contentStyle = {
        color: '#666',
        fontSize: '1em',
        lineHeight: '1.4',
    };

    return (
        <div style={cardStyle} onClick={onClick}>
            <h2 style={titleStyle}>{name}</h2>
            <p style={contentStyle}>{content}</p>
        </div>
    )
}