import axios from "axios";
import { serverErrorMsg } from "../serverErrorMsg";
import { baseUrl } from "./index";

//Axios Config
axios.defaults.withCredentials = true;

//Login Request
export const userLogin = async (username, password, user) => {
  const { setIsLoading, setError, setUser } = user;
  setError({ status: 200, message: "ok" });
  setIsLoading(true);
  try {
    const res = await axios.post(`${baseUrl}/users/login`, {
      username,
      password,
    });
    if (res.status === 200) {
      setUser({ ...res.data.user });
    }
  } catch (error) {
    // If user is unauthorized, set error status to 401.
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        setError({
          status,
          message: "Invalid username or password.",
        });
      }

      // Else, set error status to 500.
    } else {
      setError({
        status: 500,
        message: serverErrorMsg,
      });
    }
  }
  setIsLoading(false);
};

//Register Request
export const registerUser = async (username, password, user) => {
  const { setIsLoading, setError, setUser } = user;
  setError({ status: 200, message: "ok" });
  setIsLoading(true);
  try {
    //Register user
    const res = await axios.post(`${baseUrl}/users/new`, {
      username,
      password,
    });
    //If register was successful, login the user
    if (res.status === 201) {
      const res = await axios.post(`${baseUrl}/users/login`, {
        username,
        password,
      });
      //Set user state and logged in status
      setUser({ ...res.data.user });
    }
  } catch (error) {
    // If user is already registered, set error status to 409.
    if (error.response) {
      const { status, message } = error.response;
      if (status === 409) {
        setError({
          status,
          message,
        });
      }

      // Else, set error status to 500.
    } else {
      setError({
        status: 500,
        message: serverErrorMsg,
      });
    }
  }
  setIsLoading(false);
};

//Get current User data
export const getUser = async () => await axios.get(`${baseUrl}/users`);

//User logout
export const userLogout = async (setUser, app) => {
  const { dispatch, setAppState, setIsLoading } = app;
  setIsLoading(true);
  try {
    const res = await axios.delete(`${baseUrl}/users/logout`);
    if (res.status === 200) {
      setUser(null);

      // Reset app states after logout.
      dispatch({ type: "load", payload: [] });
      setAppState({ id: "0", title: "Main", parentId: null });
    }
  } catch (error) {
    window.location.href = "/404";
  }
  setIsLoading(false);
};
