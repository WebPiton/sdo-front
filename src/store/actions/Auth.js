import axios from "../../axios/axios";
import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_PAGE
} from "./actionTypes";

export function auth(email, password) {
  return async (dispatch) => {
    if (!validateEmail(email)) {
      return dispatch(authError(405, "Почта указанна не верно"));
    }
    if (password.trim().length <= 5) {
      return dispatch(authError(406, "Пароль меньше 6 символов"));
    }
    const respons = await axios.get(
      "users/auth?email=" + email + "&pwd=" + password
    );
    const data = respons.data;
    switch (data.code) {
      case 401:
        return dispatch(authError(data.code, data.description));
      case 402:
        return dispatch(authError(data.code, data.description));
      case 200:
        localStorage.setItem("token", data.token);
        localStorage.setItem("dateLast", data.dateLast);
        localStorage.setItem("role", data.role);
        dispatch(authSuccess(data.token, data.role));
        break;
      default:
        return dispatch(authError(0, "Что-то пошло не так"));
    }
  };
}

function validateEmail(email) {
  var pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
}

export function reg(email, password, repitPassword) {
  return async (dispatch) => {
    if (!validateEmail(email)) {
      return dispatch(authError(405, "Почта указанна не верно"));
    }
    if (password.trim().length <= 5) {
      return dispatch(authError(406, "Пароль меньше 6 символов"));
    }
    if (password !== repitPassword) {
      return dispatch(authError(407, "Пароли не совпадает"));
    }
    const respons = await axios.get(
      "users/reg?email=" + email + "&pwd=" + password
    );
    const data = respons.data;
    switch (data.code) {
      case 403:
        return dispatch(authError(data.code, data.description));
      case 200:
        localStorage.setItem("token", data.token);
        localStorage.setItem("dateLast", data.dateLast);
        localStorage.setItem("role", data.role);
        dispatch(authSuccess(data.token, data.role));
        break;
      default:
        return dispatch(authError(0, "Что-то пошло не так"));
    }
  };
}

export function authLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("dateLast");
  localStorage.removeItem("role");
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      dispatch(logout());
    } else {
      const dateLast = new Date(localStorage.getItem("dateLast"));
      if (dateLast <= new Date().toString()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, role));
        dispatch(
          authLogout((dateLast.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function authSuccess(token, role) {
  return {
    type: AUTH_SUCCESS,
    token,
    role,
  };
}

export function authError(code, description) {
  return {
    type: AUTH_ERROR,
    code,
    description,
  };
}

export function studentPage(page) {
  return (dispatch) => {
    sessionStorage.setItem("page", page);
    dispatch(pageSuccess(page))
  }
}

export function autoPage() {
  return (dispatch) => {
    const page = sessionStorage.getItem("page");
    if (!page) {
      dispatch(pageSuccess('zone'))
    } else {
      dispatch(pageSuccess(page))
    }
  }
}

export function pageSuccess(studentPage) {
  return {
    type: AUTH_PAGE,
    studentPage
  }
}