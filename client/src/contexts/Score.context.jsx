import React, { createContext, useContext, useState } from "react";

// Buat Context
const ScoreContext = createContext();

// Provider
export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
  });

  const [playerNames, setPlayerNames] = useState({
    player1: localStorage.getItem("name") || "Player 1",
    player2: "Player 2",
  });

  // Meningkatkan score pemain tertentu
  const increaseScore = (player, amount = 1) => {
    setScores((prev) => ({
      ...prev,
      [player]: prev[player] + amount,
    }));
  };

  // Mengatur nama pemain
  const setPlayerName = (player, name) => {
    setPlayerNames((prev) => ({
      ...prev,
      [player]: name,
    }));
  };

  // Reset scores
  const resetPlayers = () => {
    setScores({
      player1: 0,
      player2: 0,
    });
    setPlayerNames({
      player1: "Player 1",
      player2: "Player 2",
    });
  };

  return (
    <ScoreContext.Provider
      value={{
        scores,
        playerNames,
        increaseScore,
        setPlayerName,
        resetPlayers,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

// Custom Hook untuk akses context
export const useScore = () => useContext(ScoreContext);
