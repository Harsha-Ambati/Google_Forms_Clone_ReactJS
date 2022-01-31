import { SIGNUP_REQUEST } from './types'

//Initially, we will be waiting to get the credentials of user
const signupRequest = function({ first_name, username, password }) {
  return {
    type: SIGNUP_REQUEST,
    first_name,
    username,
    password,
  }
}

export default signupRequest