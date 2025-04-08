import "../styles/home.css";

export default function HomePage() {
  return (
    <div className="body">
      <div className="button-border">
        <div className="button-base">
          <button className="button" id="startButton" type="button">
            START
          </button>
        </div>
      </div>
      <div className="button-border">
        <div className="button-base">
          <button className="button" onclick="viewHighScores()">
            SCORES
          </button>
        </div>
      </div>
      <div>
        <button id="hintsButton">Hints</button>
      </div>
    </div>
  );
}
