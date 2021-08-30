import axios from "../../axios/axios";
import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR } from "./actionTypes";

export function auth(email, password) {
  const dataReqest = new FormData();
  dataReqest.append("email", email);
  dataReqest.append("pwd", password);

  return async (dispatch) => {
    const respons = await axios.post(
      "createAuth", dataReqest
    );

    const data = respons.data;
    // console.log(data);
    if (data.type == 'success') {
      localStorage.setItem("token", data.token);
      console.log(data.token == localStorage.getItem("token"));
      dispatch(authSuccess(data.token));
      window.location.href = '/'
    }


  };
}

export function logout() {
  localStorage.removeItem("token");
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    error,
  };
}
