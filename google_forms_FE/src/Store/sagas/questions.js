import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import {  questionsReceived , formIdReceived, responsesReceived, responseReceived, excelReceivedData, createdFormsReceived} from "../actions/questions";
import { GET_QUESTIONS, SEND_ANSWERS, SET_QUESTIONS, GET_RESPONSES, GET_RESPONSE, GET_EXCELDATA, GET_CREATEDFORMS } from "../actions/types";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function* setQuestions(action) {
  const token = yield localStorage.getItem("access");
  const receivedId = yield axios
    .request({
      method: "POST",
      url: "/api/form/createform",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: action.data,
  }).then((response)=>response.data)
  .catch(error => ({ error }))
  yield put(formIdReceived(receivedId));
}


function* getQuestions(action) {
  const token = yield localStorage.getItem("access");
  const getData = yield axios
  .request({
    method: "GET",
    url: "/api/form/"+ action.id + "/view",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data).catch(error => ({ error }))
  yield put(questionsReceived(getData));
}


function* sendAnswers(action){
  const token = yield localStorage.getItem("access");
  yield axios
    .request({
      method: "POST",
      url: "/api/form/" + action.id + "/createresponse",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: action.data,
    })
    .then((response) => response.data).catch(error => ({ error }))
}
 


function* getResponses(action) {
  const token = yield localStorage.getItem("access");
  const responses = yield axios
  .request({
    method: "GET",
    url: "/api/form/"+ action.id + "/viewresponses",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data).catch(error => ({ error }))
    yield put(responsesReceived(responses));
}

function* getResponse(action) {
  const token = yield localStorage.getItem("access");
  const response = yield axios
  .request({
    method: "GET",
    url: "/api/form/"+ action.id + "/"+ action.qid + "/viewresponse",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data).catch(error => ({ error }))
    yield put(responseReceived(response));
}

function* getExcelData(action){
  const token = yield localStorage.getItem("access");
  const excelData = yield axios
  .request({
    method: "GET",
    url: "/api/form/"+ action.id + "/download",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data).catch(error => ({ error }))
    yield put(excelReceivedData(excelData));
}

function* getCreatedForms(action){
  const token = yield localStorage.getItem("access");
  const forms = yield axios
  .request({
    method: "GET",
    url: "/api/welcome",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data).catch(error => ({ error }))
    yield put(createdFormsReceived(forms));
  }

function* questionWatcher() {
  yield takeLatest(SET_QUESTIONS, setQuestions);
  yield takeLatest(GET_QUESTIONS, getQuestions);
  yield takeLatest(SEND_ANSWERS, sendAnswers);
  yield takeLatest(GET_RESPONSES, getResponses);
  yield takeLatest(GET_RESPONSE, getResponse);
  yield takeLatest(GET_EXCELDATA, getExcelData);
  yield takeLatest(GET_CREATEDFORMS, getCreatedForms);
}

export default questionWatcher;
