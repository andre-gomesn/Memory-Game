"use client"
import Timer from "@app/components/Timer"
import { useState } from "react"

function Game() {
    const [seconds,setSeconds]=useState(0)
    const [minutes,setMinutes]=useState(0)
    return (
        <Timer seconds={seconds} setSeconds={setSeconds} minutes={minutes} setMinutes={setMinutes}/>
    )
}

export default Game