import "../styles/game.css";
import ImageHome from "../assets/home.png";
import { useNavigate } from "react-router";
import { useRef, useEffect, useState } from "react";
import Swiper from "../components/Swiper";
import { useScore } from "../contexts/Score.context";
import ak47Sound from "../assets/ak47_sound.webm";
import swiperOhMan from "../assets/swiper_oh_man.mp3";
import swiper_theme from "../assets/swiper_theme.webm";
import Swal from "sweetalert2";
import { useRoom } from "../contexts/Room.context";
import { api } from "../helpers/http-client";
import io from "socket.io-client";

const socket = io("https://marugame-server.azriltdkso.fun");

export default function GamePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const name = localStorage.getItem("name");
  const { room, setRoom } = useRoom();
  const {
    scores,
    setScores,
    increaseScore,
    playerNames,
    setPlayerNames,
    setPlayerName,
    resetPlayers,
  } = useScore();
  const [swipers, setSwipers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [swalShown, setSwalShown] = useState(false); // Track if Swal has been shown
  const [playerNumber, setPlayerNumber] = useState("");
  const skipDidClose = useRef(false);

  function goToHome() {
    setRoom(0);
    resetPlayers();
    navigate("/");
  }

  async function resetRoomAndRedirect(id, path) {
    try {
      await api.put(`/game-rooms/${id}/reset`);
      setRoom(0);
      navigate(path);
    } catch (error) {
      console.log("🚀 ~ resetRoom ~ error:", error);
    }
  }

  useEffect(() => {
    audioRef.current = new Audio(swiper_theme);
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    async function joinGameRoom(id) {
      try {
        const response = await api.get(`/game-rooms/${id}`);
        const { player1, player2 } = response.data;
        if (player1 === name) {
          setPlayerNames({ player1: name, player2: player2 });
          setPlayerNumber("player1");
          socket.emit("joinRoom", { room, name, playerNumber: "player1" });
        } else if (player2 === name) {
          setPlayerNames({ player1: player1, player2: name });
          setPlayerNumber("player2");
          socket.emit("joinRoom", { room, name, playerNumber: "player2" });
        }
      } catch (error) {
        console.log("🚀 ~ fetchRoomById ~ error:", error);
      }
    }
    joinGameRoom(room);
  }, []);

  useEffect(() => {
    if (!playerNames.player1 || !playerNames.player2) {
      if (!swalShown) {
        setSwalShown(true);
        Swal.fire({
          title: "Waiting for players...",
          html: "Redirecting in <b></b> seconds.",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 30 * 1000,
          timerProgressBar: true,
          didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector("b");
            const timerInterval = setInterval(() => {
              b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 100);
            Swal.showLoading();
            Swal.getHtmlContainer().addEventListener("close", () =>
              clearInterval(timerInterval)
            );
          },
          didClose: () => {
            if (skipDidClose.current) {
              skipDidClose.current = false; // reset for next time
              return;
            }
            resetRoomAndRedirect(room, "/");
            resetPlayers();
          },
        });
      }
      return;
    }

    if (swalShown) {
      skipDidClose.current = true;
      Swal.close();
    }

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
      resetRoomAndRedirect(room, "/game-over");
    }

    return () => {
      clearInterval(countdownInterval); // Cleanup countdown interval
      clearInterval(swiperInterval); // Cleanup swiper interval
    };
  }, [timeLeft, playerNames]);

  useEffect(() => {
    // Listen for "playerJoined" events from the server
    socket.on("playerJoined", (data) => {
      console.log("Player joined:", data);
      setPlayerName(data.playerNumber, data.name);
    });

    // Cleanup the listener when the component unmounts or re-renders
    return () => {
      socket.off("playerJoined");
    };
  }, [setPlayerName]);

  useEffect(() => {
    socket.on("player1ScoreUpdated", (data) => {
      console.log("Player 1 score updated:", data);

      setScores((prevScores) => ({
        ...prevScores,
        player1: data.score,
      }));
    });
    socket.on("player2ScoreUpdated", (data) => {
      console.log("Player 2 score updated:", data);
      setScores((prevScores) => ({
        ...prevScores,
        player2: data.score,
      }));
    });

    return () => {
      socket.off("player1ScoreUpdate");
      socket.off("player2ScoreUpdate");
    };
  }, []);

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

    increaseScore(playerNumber, 100);
    socket.emit("scoreUpdate", {
      room,
      score: scores[playerNumber] + 100,
      playerNumber,
    });

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
            {playerNames.player1 || "Player 1 (awaiting...)"}:{" "}
            <span className="value" id="score">
              {scores.player1}
            </span>
          </span>
          <span>
            {playerNames.player2 || "Player 2 (awaiting...)"}:{" "}
            <span className="value" id="score">
              {scores.player2}
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
