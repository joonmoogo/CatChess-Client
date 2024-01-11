import { useState } from "react"

export default function Timer({ time, stage, state }) {
    return (
        <div>{state}-{stage?.round}-{stage?.stage}-{time}</div>
    )
}