import React, { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState(null);

  const resetRoom = () => {
    setRoom(null);
  };

  return (
    <RoomContext.Provider value={{ room, setRoom, resetRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
export const useRoom = () => useContext(RoomContext);
