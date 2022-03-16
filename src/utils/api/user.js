import axios from "axios";
import { baseUrl } from "./index";

//Axios Config
axios.defaults.withCredentials = true;

//Login Request
export const userLogin = async (
  username,
  password,
  setUser,
  setIsLoggedIn,
  setIsError,
  setIsLoading
) => {
  try {
    const res = await axios.post(`${baseUrl}/users/login`, {
      username,
      password,
    });
    setUser({ ...res.data.user });
    setIsLoggedIn(res.data.isLoggedIn);
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
  }
};

//Register Request
export const registerUser = async (
  username,
  password,
  setUser,
  setIsLoggedIn,
  setIsError,
  setIsLoading
) => {
  try {
    //Register user
    const res = await axios.post(`${baseUrl}/users/new`, {
      username,
      password,
    });
    //If register was successful, login the user
    if (res.data.success) {
      const res = await axios.post(`${baseUrl}/users/login`, {
        username,
        password,
      });
      //Set user state and logged in status
      setUser({ ...res.data.user });
      setIsLoggedIn(res.data.isLoggedIn);
    } else {
      setIsLoggedIn(res.data.isLoggedIn);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
  }
};

//Get current User data
export const getUser = async (
  setIsLoading,
  setIsError,
  setUser,
  setIsLoggedIn,
  dispatch
) => {
  setIsLoading(true);
  setIsError(false);
  const res = await axios.get(`${baseUrl}/users`);
  //Check if user is logged in
  if (res.data.user) {
    setUser({ ...res.data.user });
    //fetch folder data
    const folders = await axios.get(`${baseUrl}/folders`);
    //fetch link data
    const links = await axios.get(`${baseUrl}/links`);
    //load data onto the app
    dispatch({ type: "load", data: [...folders.data, ...links.data] });
  }
  setIsLoggedIn(res.data.isLoggedIn);
};

//User logout
export const userLogout = async (setIsLoggedIn) => {
  const res = await axios.post(`${baseUrl}/users/logout`);
  setIsLoggedIn(res.data.isLoggedIn);
};
