import browserHistory from "history/createBrowserHistory";
import axios from 'axios';
import { LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_ERROR,LOGOUT} from '../actions/types';
import {setUser} from '../actions/user';
import { put, cancelled, takeLatest, call } from 'redux-saga/effects';


//This is going to check the login. If the token is set it will push to home page else it will redirect to login

function* checkLogin (props) {
  let token
  try {
    token =  yield axios.request({
    method: 'POST',
    url: '/api/login/',
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      username:props.username,
      password:props.password,
    }),

    response: [
      (data) => 
      {
        return JSON.parse(data);
      },
    ]
  }
  );
    token = yield token.data
    yield put(setUser(token))
    yield put({ type: LOGIN_SUCCESS })
    yield localStorage.setItem('access', token.access)
    yield localStorage.setItem('refresh',token.refresh)
  } catch (error) {
    yield put({ type: LOGIN_ERROR,error})
  } finally {
    if (yield cancelled()) {
      browserHistory.push('/login')
    }
    return token
  }

}

function* logout() {
  const token1 = yield localStorage.getItem("access");
  const token2 = yield localStorage.getItem("refresh");
  yield axios
    .request({
      method: "POST",
      url: "/api/logout/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token1}`,
      },
      data : JSON.stringify({
        refresh : token2
      }
        )
    })
    .then((response) => response.data)
    .catch((error) => ({
      error
    }));
}


function* loginWatcher () {
yield takeLatest(LOGIN_REQUEST,checkLogin)
yield takeLatest(LOGOUT,logout)
}

export default loginWatcher
