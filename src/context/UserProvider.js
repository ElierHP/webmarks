import React, { useState, createContext } from "react";

export const User = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({ user: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <User.Provider
      value={[
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      ]}
    >
      {children}
    </User.Provider>
  );
};
