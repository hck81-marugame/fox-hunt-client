import "../styles/home.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRoom } from "../contexts/Room.context";
import Swal from "sweetalert2";
import { api } from "../helpers/http-client";

export default function HomePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const name = localStorage.getItem("name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { room, setRoom } = useRoom();

  function goToLogin() {
    localStorage.removeItem("name");
    setRoom(0);
    navigate("/login");
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function selectRoom(room) {
    setRoom(room);
    console.log(`Room ${room} selected`);
    setIsDropdownOpen(false);
  }

  async function goToGame() {
    if (!room) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a room first!",
      });
    }
    try {
      const response = await api.put(`/game-rooms/${room}`, {
        name,
      });
      console.log(response.data);
      navigate("/game");
    } catch (error) {
      if (error.response?.data?.message) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `This room is full! Try a different one!`,
        });
      }
    }
  }

  useEffect(() => {
    audioRef.current = new Audio("/src/assets/Dora_TRAP_REMIX.webm");
    audioRef.current.loop = true;
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    if (!name) {
      navigate("/login");
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <div className="body">
      <div className="title-container">
        <h1 className="game-title">
          Let's play, <span className="player-name">{name}</span>🔫
        </h1>
      </div>
      <div className="button-border">
        <div className="button-base">
          <button onClick={goToLogin} className="button">
            CHANGE NAME
          </button>
        </div>
      </div>
      <div className="button-border">
        <div className="button-base">
          <button className="button" type="button" onClick={toggleDropdown}>
            {room
              ? `ROOM ${String.fromCharCode(65 + room - 1)}`
              : "SELECT ROOM"}
          </button>

          {isDropdownOpen && (
            <div className="dropup-menu">
              {[1, 2, 3, 4, 5].reverse().map((value) => (
                <div
                  key={value}
                  className="dropdown-item"
                  onClick={() => selectRoom(value)}
                >
                  ROOM {String.fromCharCode(65 + value - 1)}{" "}
                  {/* Converts index to A-E */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="button-border">
        <div className="button-base">
          <button onClick={goToGame} className="button">
            START HUNT
          </button>
        </div>
      </div>
    </div>
  );
}
