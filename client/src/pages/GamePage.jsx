import "../styles/game.css";
import ImageHome from "../assets/home.png";
import { useNavigate } from "react-router";
import { useRef, useEffect, useState } from "react";
import Swiper from "../components/Swiper";
import { useScore } from "../contexts/Score.context";
import ak47Sound from "../assets/ak47_sound.webm";
import swiperOhMan from "../assets/swiper_oh_man.mp3";

export default function GamePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const { scores, increaseScore, playerNames } = useScore();
  const [swipers, setSwipers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);

  function goToHome() {
    navigate("/");
  }

  useEffect(() => {
    audioRef.current = new Audio("/src/assets/swiper_theme.webm");
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval); // Stop countdown when time reaches 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Countdown every 1000ms

    const swiperInterval = setInterval(() => {
      const newSwiperId = new Date().getTime().toString();
      setSwipers((prevSwipers) => [...prevSwipers, newSwiperId]);

      // Set a timeout to remove the swiper after 5000ms
      setTimeout(() => {
        setSwipers((prevSwipers) =>
          prevSwipers.filter((swiperId) => swiperId !== newSwiperId)
        );
      }, 5000);
    }, 500); // Spawn swipers every 500ms

    if (timeLeft === 0) {
      clearInterval(swiperInterval); // Stop swiper spawning when timeLeft reaches 0
      navigate("/game-over");
    }

    return () => {
      clearInterval(countdownInterval); // Cleanup countdown interval
      clearInterval(swiperInterval); // Cleanup swiper interval
    };
  }, [timeLeft]);

  useEffect(() => {
    const gameArea = document.getElementById("game-area");

    function handleMouseDown() {
      const mouseDownAudio = new Audio(ak47Sound);
      mouseDownAudio.play().catch((e) => console.log("Audio play failed:", e));
    }

    gameArea.addEventListener("mousedown", handleMouseDown);

    return () => {
      gameArea.removeEventListener("mousedown", handleMouseDown); // Cleanup listener
    };
  }, []);

  function handleSwiperClick(id) {
    const swiperClickAudio = new Audio(swiperOhMan); // Create a new Audio instance
    swiperClickAudio.volume = 0.5; // Reduce the volume to 50%
    swiperClickAudio.currentTime = 0.5; // Skip the first half-second
    swiperClickAudio.play().catch((e) => console.log("Audio play failed:", e)); // Play the sound

    increaseScore("player1", 100);
    setSwipers((prevSwipers) => {
      return prevSwipers.filter((swiperId) => {
        return swiperId !== id;
      });
    });
  }

  return (
    <div id="game-page">
      <div id="header">
        <img id="home-button" onClick={goToHome} src={ImageHome} alt="home" />
        <span>
          Time:{" "}
          <span className="value" id="timer">
            {timeLeft}
          </span>
        </span>
        <div id="score-area">
          <span>
            {playerNames.player1}:{" "}
            <span className="value" id="score">
              {scores.player1}
            </span>
          </span>
          <span>
            {playerNames.player2}:{" "}
            <span className="value" id="score">
              0
            </span>
          </span>
        </div>
      </div>
      <div id="game-area">
        {swipers.map((id) => {
          return <Swiper key={id} onClick={() => handleSwiperClick(id)} />;
        })}
      </div>
    </div>
  );
}
