import { useEffect } from "react";

export default function Level({level}) {

    useEffect(()=>{
        console.log(level);
    })
    const buttonStyle={
        color:'white',
        border:'1px solid white',
        height:'50%'
    }
    function LevelHandler(event){
        console.log('Level button was clicked');
    }

    return (
        <div style={buttonStyle} onClick={LevelHandler}>Level={level}</div>
    )
}