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
    // If user is unauthorized, set error status to 401.
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        user.setError({
          status,
          message: "Invalid username or password.",
        });
      }

      // Else, set error status to 500.
    } else {
      user.setError({
        status: 500,
        message:
          "Server is currently offline. Please try again at a later time.",
      });
    }
    user.setIsLoading(false);
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
    // If user is already registered, set error status to 409.
    if (error.response) {
      const { status, message } = error.response;
      if (status === 409) {
        user.setError({
          status,
          message,
        });
      }

      // Else, set error status to 500.
    } else {
      user.setError({
        status: 500,
        message:
          "Server is currently offline. Please try again at a later time.",
      });
    }

    user.setIsLoading(false);
  }
};

//Get current User data
export const getUser = async () => await axios.get(`${baseUrl}/users`);

//User logout
export const userLogout = async (setUser, app) => {
  try {
    const res = await axios.delete(`${baseUrl}/users/logout`);
    if (res.status === 200) {
      setUser(null);

      // Reset app states after logout.
      app.dispatch({ type: "load", payload: [] });
      app.setAppState({ id: "0", title: "Main", parentId: null });
    }
  } catch (error) {
    window.location.href = "/404";
  }
};
