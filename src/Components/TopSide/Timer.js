import { useState } from "react"

export default function Timer({time,stage}){
    console.log(stage);
    return(
        <div>{stage?.round} {stage?.stage} {time}</div>
    )
}