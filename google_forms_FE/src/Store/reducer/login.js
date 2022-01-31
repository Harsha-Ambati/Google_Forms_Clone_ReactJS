import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from "../actions/types";

const initialState = {
  requesting: false,
  successful: false,
  isAuthenticated : null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        requesting: true,
        successful: false,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        requesting: true,
        successful: true,
        isAuthenticated: true,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        isAuthenticated: false,
      };
    case LOGOUT:
      // localStorage.removeItem("access");
      return {
        ...state,
        isAuthenticated: false,
      }


    default:
      return state;
  }
};

export default loginReducer;
