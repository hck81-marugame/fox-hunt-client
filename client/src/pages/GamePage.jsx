import "../styles/game.css";
import ImageHome from "../assets/home.png";
import ImageAk47 from "../assets/ak47.png";
export default function GamePage() {
  return (
    <>
      <div id="header">
        <img id="home-button" onclick="goToHome()" src={ImageHome} alt="home" />
        <h1>
          Time:{" "}
          <span className="value" id="timer">
            0
          </span>
        </h1>
        <h1>
          Score:{" "}
          <span className="value" id="score">
            0
          </span>
        </h1>
      </div>
      <div id="game-area" />
      <div id="gun-area">
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
      </div>
    </>
  );
}
