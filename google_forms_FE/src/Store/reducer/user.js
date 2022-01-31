import { SET_USER, UNSET_USER } from "../actions/types";

const initialState = {
    id: null,
    token : null,
}

const userReducer =  (state = initialState, action) =>  {
  switch (action.type) {
    case SET_USER:
      return {
        id: action.token.userId,
        token: action.token,
      }
    case UNSET_USER:
      return {
        id: null,
        token: null,
      }
    default:
      return state
  }
}

export default userReducer