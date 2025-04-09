import "../styles/home.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useRoom } from "../contexts/Room.context";
import Swal from "sweetalert2";

export default function HomePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { room, setRoom, resetRoom } = useRoom();

  function goToGame() {
    if (!room) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a room first!",
      });
    }
    navigate("/game");
  }

  function goToLogin() {
    navigate("/login");
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function selectRoom(room) {
    setRoom(room);
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    audioRef.current = new Audio("/src/assets/Dora_TRAP_REMIX.webm");
    audioRef.current.loop = true;
    audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
    if (!localStorage.getItem("name")) {
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
          Let's play,{" "}
          <span className="player-name">{localStorage.getItem("name")}</span>🔫
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
            {room ? `ROOM ${room}` : "SELECT ROOM"}
          </button>

          {isDropdownOpen && (
            <div className="dropup-menu">
              {["E", "D", "C", "B", "A"].map((room) => (
                <div
                  key={room}
                  className="dropdown-item"
                  onClick={() => selectRoom(room)}
                >
                  ROOM {room}
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
