import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GameOverPage from "./pages/GameOverPage";
import GamePage from "./pages/GamePage";
import Layout from "./layouts/layout";
import { RoomProvider } from "./contexts/Room.context";

function App() {
  return (
    <RoomProvider>
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
    </RoomProvider>
  );
}

export default App;
