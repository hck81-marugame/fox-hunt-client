import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GameOverPage from "./pages/GameOverPage";
import GamePage from "./pages/GamePage";
import Layout from "./layouts/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/game" element={<GamePage />} />
            <Route path="/game-over" element={<GameOverPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
