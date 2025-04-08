import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GameOverPage from "./pages/GameOverPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/game-over" element={<GameOverPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
