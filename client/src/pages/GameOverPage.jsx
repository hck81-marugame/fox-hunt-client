import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Confetti from "react-confetti";
import { useScore } from "../contexts/Score.context";
import { useRoom } from "../contexts/Room.context";

export default function GameOverPage() {
  const navigate = useNavigate();
  const { scores, playerNames, resetPlayers } = useScore();
  const { setRoom } = useRoom();

  const audioRef = useRef(null);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (!playerNames.player1 || !playerNames.player2) {
      setRoom(0);
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/src/assets/winning.mp3");
    audioRef.current.volume = 0.4;
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  function goHome() {
    resetPlayers();
    setRoom(0);
    navigate("/");
  }

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.2}
          colors={["#FF8C00", "#FFA500", "#FFD700", "#FFFF00", "#32CD32"]}
        />
      )}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full text-center">
          <h1 className="text-6xl font-bold mb-6">🦊 Game Over 🦊</h1>
          <div className="mb-6">
            <h2 className="text-4xl font-semibold text-green-400">🏆 Winner</h2>
            <p className="text-2xl mt-2">
              Name:{" "}
              <span className="font-bold">
                {scores.player1 >= scores.player2
                  ? playerNames.player1
                  : playerNames.player2}
              </span>
            </p>
            <p className="text-2xl">
              Score:{" "}
              <span className="font-bold">
                {scores.player1 >= scores.player2
                  ? scores.player1
                  : scores.player2}
              </span>
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-red-400">💀 Loser</h2>
            <p className="text-xl mt-2">
              Name:{" "}
              <span className="font-bold">
                {scores.player1 >= scores.player2
                  ? playerNames.player2
                  : playerNames.player1}
              </span>
            </p>
            <p className="text-xl">
              Score:{" "}
              <span className="font-bold">
                {scores.player1 >= scores.player2
                  ? scores.player2
                  : scores.player1}
              </span>
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
