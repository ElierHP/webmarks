import React, { useState, createContext } from "react";

export const User = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ user: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <User.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </User.Provider>
  );
};
