import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <h1 className="text-center text-7xl font-bold">Memory <br /> Game</h1>

      <div className="mt-[-1vh]">
        <h3 className="text-center text-xl font-bold underline mb-4">Instructions:</h3>
        <ul className="list-inside list-disc text-left">
          <li>You`ll have 5 seconds to memorize the pairs</li>
          <li>Complete the game as fast as you can</li>
          <li>Enter your username and compete with other players in the leaderboard</li>
        </ul>
      </div>

      <Link href="/game">
        <button className="bg-white text-black font-bold rounded-lg border-2 px-14 py-2 text-xl hover:scale-105">Start</button>
      </Link>
    </main>
  );
}
