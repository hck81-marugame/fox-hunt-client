import React, { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState(0);

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
export const useRoom = () => useContext(RoomContext);
