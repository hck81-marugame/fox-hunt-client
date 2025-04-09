import "../styles/game.css";
import ImageHome from "../assets/home.png";
// import ImageAk47 from "../assets/ak47.png";
import { useNavigate } from "react-router";
import { useRef, useEffect } from "react";
export default function GamePage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
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

  return (
    <div id="game-page">
      <div id="header">
        <img id="home-button" onClick={goToHome} src={ImageHome} alt="home" />
        <span>
          Time:{" "}
          <span className="value" id="timer">
            0
          </span>
        </span>
        <span>
          Score:{" "}
          <span className="value" id="score">
            0
          </span>
        </span>
      </div>
      <div id="game-area"></div>
      {/* <div id="gun-area">
        <img id="gun" src={ImageAk47} alt="ak47" />
      </div>
      <div id="congratulations-modal">
        <div className="modal-content">
          <h1 id="congratulations-message">Congratulations!</h1>
          <p>
            Your score is{" "}
            <span className="value" id="final-score">
              0
            </span>
            !
          </p>
          <div className="coolinput">
            <label htmlFor="input" className="text">
              Name:
            </label>
            <input
              id="name-input"
              type="text"
              placeholder="Write here..."
              name="input"
              className="input"
            />
          </div>
          <button className="modal-btn" onclick="location.reload();">
            Retry
          </button>
          <button
            id="submit-btn"
            className="modal-btn"
            onclick="submitHighScore()"
            disabled=""
          >
            Submit
          </button>
        </div>
      </div> */}
    </div>
  );
}
