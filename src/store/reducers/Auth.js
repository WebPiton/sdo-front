import { AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  token: null,
  description: null,
  code: null,
  role: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        role: action.role,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        description: action.description,
        code: action.code,
      };
    default:
      return state;
  }
}
