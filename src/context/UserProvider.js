import React, { useState, createContext, useEffect } from "react";
import { getUser } from "../utils/api/user";

export const User = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //Check if user is logged in
  useEffect(() => {
    const userAsync = async () => {
      setIsLoading(true);
      setIsError(false);

      //Get current User data
      const res = await getUser();

      // res is undefined if server is down
      if (res !== undefined) {
        // if user exists, set the states
        if (res.data.user) {
          setUser({ ...res.data.user });
        }
      }
      setIsLoading(false);
    };

    userAsync();
  }, []);

  return (
    <User.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      }}
    >
      {children}
    </User.Provider>
  );
};
