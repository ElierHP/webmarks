import axios from "axios";
import { baseUrl } from "./index";

//Axios Config
axios.defaults.withCredentials = true;

//Login Request
export const userLogin = async (username, password, user) => {
  try {
    const res = await axios.post(`${baseUrl}/users/login`, {
      username,
      password,
    });
    if (res.status === 200) {
      user.setUser({ ...res.data.user });
    }
  } catch (error) {
    user.setIsLoading(false);
    user.setIsError(true);
  }
};

//Register Request
export const registerUser = async (username, password, user) => {
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
      user.setUser({ ...res.data.user });
    }
  } catch (error) {
    user.setIsLoading(false);
    user.setIsError(true);
  }
};

//Get current User data
export const getUser = async () => await axios.get(`${baseUrl}/users`);

//User logout
export const userLogout = async (setUser) => {
  const res = await axios.delete(`${baseUrl}/users/logout`);
  if (res.status === 200) {
    setUser(null);
  }
};
