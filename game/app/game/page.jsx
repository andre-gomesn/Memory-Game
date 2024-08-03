"use client"
import Timer from "@app/components/Timer"
import { useState,useEffect } from "react"
import Card from "@app/components/Card"
import { shuffleArray } from "@app/components/ShuffleArray"

function Game() {
    const [seconds,setSeconds]=useState(0)
    const [minutes,setMinutes]=useState(0)
    const [cards,setCards]=useState([])
    const [score,setScore]=useState(0)
    const [memorize, setMemorize] = useState(true);
    const [gameLocked, setGameLocked] = useState(true);
    const cardsPaths =[
        'react',
        'tailwind',
        'laravel',
        'sass',
        'javascript'
    ]
    const [pairs, setPairs] = useState([]);


    useEffect(() => {
        let unshuffledCards=[]
        for (let index = 0; index < cardsPaths.length; index++) {
            //add card with path
            unshuffledCards.push(cardsPaths[index])
            //add card again to represent pair
            unshuffledCards.push(cardsPaths[index])
        }
        // console.log(unshuffledCards)
        setCards(shuffleArray(unshuffledCards))
    }, []);

    useEffect(() => { 
        //verify if 2 cards were selected
        if (pairs.length === 2) {
            //verify if they have the same value
            if (pairs[0] === pairs[1]) {
                setScore(prev => prev + 100);
            }
            //reset values of flipped cards
            setPairs([]);
        }
        console.log(pairs);
    }, [pairs]);

    useEffect(()=>{
        setGameLocked(false)
    },[memorize])

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-14">
            <Timer seconds={seconds} setSeconds={setSeconds} minutes={minutes} setMinutes={setMinutes}/>

            <div className="mt-[10vh] w-full h-[50vh] inline-grid grid-cols-5 grid-rows-2 gap-4">
                {cards.map((card, index) => (
                    <Card key={`card`+index} index={index} cardName={card} pairs={pairs} setPairs={setPairs} gameLocked={gameLocked} memorize={memorize} setMemorize={setMemorize}/>
                ))}
            </div>
      </main>
    )
}

export default Game