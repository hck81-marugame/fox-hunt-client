import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

export default function GameOverPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/src/assets/winning.mp3");
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));

    // Cleanup function to stop audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  function goHome() {
    localStorage.removeItem("name");
    navigate("/login");
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full text-center">
          <h1 className="text-6xl font-bold mb-6">🦊 Game Over 🦊</h1>
          <div className="mb-6">
            <h2 className="text-4xl font-semibold text-green-400">🏆 Winner</h2>
            <p className="text-2xl mt-2">
              Name: <span className="font-bold">Player1</span>
            </p>
            <p className="text-2xl">
              Score: <span className="font-bold">1200</span>
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400">💀 Loser</h2>
            <p className="text-xl mt-2">
              Name: <span className="font-bold">Player2</span>
            </p>
            <p className="text-xl">
              Score: <span className="font-bold">850</span>
            </p>
          </div>
          <button
            onClick={goHome}
            className="w-ms bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
          >
            New Game
          </button>
        </div>
      </div>
    </>
  );
}
