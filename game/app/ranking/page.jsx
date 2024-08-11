'use client'
import { useEffect, useState } from 'react'

function Ranking() {
  const [users, setUsers] = useState([]);
  const [maxRanking, setMaxRanking] = useState(10);
  const [selectedUser, setSelectedUser] = useState(false);
  const [myUserRank, setMyUserRank] = useState(null);
  const [myNumberPosition, setMyNumberPosition] = useState(null);
  const [userOutRange, setUserOutRange] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(false);

    useEffect(() => {
        setCurrentUsername(localStorage.getItem("username_memory_game"))
        getUsersRanking()
    }, []);

    const getUsersRanking = async () => {
        try {
            const response = await fetch('/api/user/all', {
                cache: 'no-store',
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        myPosition();
    }, [users]);

    const myPosition = () => {
        console.log(users)
        let userPos = users.findIndex(user => user.username === currentUsername);
        userPos++
        if (userPos !== -1) {
            let obj = users[userPos];
            setMyUserRank(obj);
            // console.log(obj)
            setMyNumberPosition(userPos);
            if (userPos > 10) {
            setMaxRanking(9);
            setUserOutRange(true);
        } else {
                console.log('position: ', userPos)
                setTimeout(() => {
                    setSelectedUser(true)
                }, 2000)
            }
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-start px-14 py-2">
            <h1 className="text-center text-4xl font-bold">Ranking</h1>
            <div className='mt-10 w-[50vw] flex flex-col justify-start items-center h-[60vh] text-lg'>
                {users.slice(0, maxRanking).map((user, index) => (
                    <div className='flex items-center h-[50px] w-full justify-center' key={user.username}>
                        <div id={`number${index + 1}`} className='w-[10%] text-center'>{index + 1}º</div>
                        <div className='w-[80%] text-center'>{user.username}</div>
                        <div className='w-[10%] text-center'>{user.score}</div>
                    </div>
                ))}
                {userOutRange && myUserRank ?
                <>
                    <div className='flex items-center h-[50px] w-full justify-center' key={myUserRank.username}>
                        <div id={`number${index + 1}`} className='w-[5%] text-center'>{index + 1}º</div>
                        <div className='w-[60%] text-center'>{myUserRank.username}</div>
                        <div className='w-[20%] text-center'>{myUserRank.score}</div>
                    </div>
                </>
                : ''}
            </div>
        </main>
    )
}

export default Ranking
