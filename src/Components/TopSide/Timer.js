import { useState } from "react"

export default function Timer({time,stage}){
    return(
        <div>{stage?.round} {stage?.stage} {time}</div>
    )
}