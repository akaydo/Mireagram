import axios from "axios";
import { loginStart, loginSuccess, loginFailure, logout } from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://mireagram-api.vercel.app/api/user/login",
      user
    );
    dispatch(loginSuccess(res.data));
    alert("Успешный вход в учетную запись");
  } catch (error) {
    dispatch(loginFailure());
    alert("Неуспешный вход в учетную запись");
  }
};

export const VerifyEmail = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://mireagram-api.vercel.app/api/user/verify/email",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const signup = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://mireagram-api.vercel.app/api/user/create/user",
      user
    );
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
