import React, { useState, createContext, useEffect } from "react";
import { getUser } from "../utils/api/user";
import { serverErrorMsg } from "../utils/serverErrorMsg";

export const User = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: 200, message: "ok" });

  //Check if user is logged in
  useEffect(() => {
    const userAsync = async () => {
      setIsLoading(true);

      try {
        //Get current User data
        const res = await getUser();

        // res is undefined if server is down
        if (res !== undefined) {
          // if user exists, set the states
          if (res.data.user) {
            setUser({ ...res.data.user });
          }
        }
      } catch (error) {
        setError({
          status: 500,
          message: serverErrorMsg,
        });
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
        error,
        setError,
      }}
    >
      {children}
    </User.Provider>
  );
};
