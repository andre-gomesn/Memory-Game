"use client"
import { useEffect } from "react"

function Timer({seconds, setSeconds, minutes, setMinutes, activated}) {
    useEffect(()=>{
        if(activated){
            let timeoutSeconds = setInterval(()=>{setSeconds(prev=>prev+1)},1000)
            if(seconds===60){
                setMinutes(minutes+1)
                setSeconds(0)
            }
            
            return()=>{clearInterval(timeoutSeconds)}
        }
    },[activated,seconds])

    return (
        <div className="bg-white text-black w-auto inline-block rounded-md px-6 py-1 text-xl">{(minutes<10?"0"+minutes:minutes)+":"+(seconds<10?"0"+seconds:seconds)}</div>
    )
}

export default Timer