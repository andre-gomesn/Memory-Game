"use client"
import { useState,useEffect } from "react";
import "@styles/card.css";
import Image from "next/image";

function Card({index, cardName, pairs, setPairs, gameLocked ,memorize=false,setMemorize=false}) {
    const [memorizeFlipped,setMemorizeFlipped]=useState(!memorize);
    const [flipped, setFlipped] = useState(false);
    const [cardLocked, setCardLocked] = useState(false);

    useEffect(() => {   
        // if memorize then the player has 5 seconds to memorize the position of the cards
        if(memorize){
            setTimeout(()=>{
                setMemorizeFlipped(true)
                    setTimeout(()=>{
                        setMemorize(false)
                },1000)
            },5000)
        }
    }, []);

    useEffect(() => { 
        //verify if 2 cards were selected and if they were not prevously discovered
        if (pairs.length === 2 && flipped && !cardLocked) { 
            //verify if the cards selected are the same
            if (pairs[0] === pairs[1]) {
                setCardLocked(true);
            } else { 
                setTimeout(() => {
                    setFlipped(false);
                }, 500);
            }
        }
    }, [pairs]);

    const handleCardClick = () =>{
        if (!flipped && !gameLocked) {
            setFlipped(true);
            setPairs((prevItems) => [...prevItems, cardName]);  
        }
    }

    return (
        <div id={`card-${index}`} className="flip-card animate__animated flex justify-center items-center" value={cardName}
        onClick={() => {handleCardClick()}}>
            <div className={`flip-card-inner ${flipped||!memorizeFlipped ? 'flip' : ""}`}>
                <div className="flip-card-front">
                    <Image width={100} height={100} src={`/img/notebook.png`}/>
                </div>
                <div className="flip-card-back">
                    <Image width={100} height={100} src={`/img/${cardName}.png`}/>
                </div>
            </div>
        </div>
    );
}

export default Card