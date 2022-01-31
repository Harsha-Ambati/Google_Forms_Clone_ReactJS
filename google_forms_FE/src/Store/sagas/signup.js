import { call, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import { SIGNUP_REQUEST, 
         SIGNUP_SUCCESS, 
         SIGNUP_ERROR 
        } 
  from "../actions/types";

function* signupApi(first_name,username,password) {

  yield axios.request({
    method: "POST",
    url: "/api/register/",
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      first_name,
      username,
      password,
    }),
    response: [
      (data) => {
        return JSON.parse(data)
      },
    ],
    
  })
}


function* checkSignup(action) {
  try {
    const { first_name, username, password } = action;
    const response = yield signupApi(first_name, username, password);
    yield put({ type: SIGNUP_SUCCESS, response });
  } catch (error) {
    yield put({ type: SIGNUP_ERROR, error });
  }
}

//This is going to watch for signup_request and when it gets it, it will call checksignup()
function* signupWatcher() {
  yield takeLatest(SIGNUP_REQUEST, checkSignup);
}
export default signupWatcher;
