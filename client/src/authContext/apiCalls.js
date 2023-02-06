import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import axiosInstance from "./axiosInstance";

export const login = async (user, dispatch) => {
  // const axiosInstance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  // });

  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("auth/login", user);
    dispatch(loginSuccess(res));
  } catch (err) {
    console.log("Login Error = ", err.response || err);
    dispatch(loginFailure(err.response?.data || err));
  }
};
