import { Outlet } from "react-router";
import { ScoreProvider } from "../contexts/Score.context";

export default function Layout() {
  return (
    <div>
      <ScoreProvider>
        <Outlet />
      </ScoreProvider>
    </div>
  );
}
