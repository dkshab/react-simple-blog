import React, { createContext, useContext } from "react";
import { useCurrentUser } from "../hooks";

export const CurrentUserContext = createContext();
export const CurrentUserProvider = ({ children }) => {
  const { currentUser } = useCurrentUser();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserValue = () => useContext(CurrentUserContext);
