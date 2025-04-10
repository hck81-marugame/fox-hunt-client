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
    player1: null,
    player2: null,
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
      player1: null,
      player2: null,
    });
  };

  return (
    <ScoreContext.Provider
      value={{
        scores,
        setScores,
        playerNames,
        increaseScore,
        setPlayerNames,
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
