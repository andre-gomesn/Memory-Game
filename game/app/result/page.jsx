"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Result() {
    const router = useRouter()
    const [userScore,setUserScore]=useState(0)
    const [userName,setUserName]=useState('')
    const [userInput,setUserInput]=useState(false)
    useEffect(() => {
        setUserScore(localStorage.getItem("score"));
    }, []);

    const handleUserChange = e =>{
        console.log(userName)
        setUserName(e.target.value)
    }

    const userNameExist = async () => {
        try {
            await fetch(`/api/user/exist/${userName}`,
                {
                    cache: 'no-store',
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            ).then(response => response.json()).then(
                (data) => {
                    console.log(data)
                    if (!data[0]) {
                        handleSaveUser()
                    } else {
                        alert('Username is already in use')
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    };

    const handleSaveUser = async () =>{
        try {
            const response = await fetch('/api/user/new', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userName,
                    score: userScore,
                })
            });

            const data = await response.json();
            console.log(data);
            localStorage.setItem("username_memory_game", data)
            router.push('/ranking')
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-14">
            <h1 className="text-center text-7xl font-bold">Congratulations!!</h1>
            <h3 className="text-center text-4xl font-bold mt-10">Your score was</h3>

            <div className="rounded-full bg-white text-black w-40 h-40 flex justify-center items-center font-bold text-xl mt-14">{userScore}</div>

            <h3 className="text-center text-2xl font-bold mt-8">Enter your username for the leaderboard</h3>
            <div className="flex justify-center items-center flex-col mt-8">
                {!userInput ?
                <button className="bg-white text-black font-bold rounded-lg border-2 px-14 py-2 text-xl hover:scale-105 mb-4" onClick={()=>{setUserInput(true)}}>Enter username</button>
                :
                    <div className="flex justify-center items-center mb-8">
                        <input required className="text-black outline-none border-b border-white text-lg rounded-md px-4 py-1" type="text" value={userName} onChange={(e)=>{handleUserChange(e)}} placeholder="Username"/>
                        <button className="bg-white text-black font-bold rounded-md border-2 px-5 py-1 text-md ml-4" onClick={()=>{userNameExist()}}>Send</button>
                    </div>
                }
                <Link href="/game">
                    <button className="underline text-white font-bold text-xl hover:scale-105">Try again</button>
                </Link>
            </div>
        </main>
    )
}

export default Result