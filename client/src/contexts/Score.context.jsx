import React, { createContext, useContext, useState } from "react";

// Buat Context
const ScoreContext = createContext();

// Provider
export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const increaseScore = (amount = 1) => {
    setScore((prev) => prev + amount);
  };

  return (
    <ScoreContext.Provider value={{ score, increaseScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

// Custom Hook untuk akses context
export const useScore = () => useContext(ScoreContext);
