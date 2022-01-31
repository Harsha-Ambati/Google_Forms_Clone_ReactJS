import {
  SET_QUESTIONS,
  GET_QUESTIONS,
  QUESTIONS_RECEIVED,
  FORM_RECEIVED,
  SEND_ANSWERS,
  SEND_QUESTIONS,
  GET_RESPONSES,
  RESPONSES_RECEIVED,
  GET_RESPONSE,
  RESPONSE_RECEIVED,
  EXCELDATA_RECEIVED,
  GET_EXCELDATA,
  CREATEDFORMS_RECEIVED,
  GET_CREATEDFORMS
} from "./types";


export const setQuestion = (data) => ({
    type:SET_QUESTIONS,
    data   
})


export const getQuestions = (data,id) => ({
  type: GET_QUESTIONS,
  data,
  id,
})

export const sendQuestions = (data,id) => ({
  type : SEND_QUESTIONS,
  data,
  id,
})

export const questionsReceived = (data) => ({
  type: QUESTIONS_RECEIVED,
  data,
})

export const formIdReceived = (data,id) => ({
  type : FORM_RECEIVED,
  data,
  id,
})

export const sendAnswers = (data,id) => ({
  type : SEND_ANSWERS,
  data,
  id
})

export const getResponses = (data,id) => ({
  type: GET_RESPONSES,
  data,
  id,
})

export const responsesReceived = (data) => ({
  type: RESPONSES_RECEIVED,
  data,
})

export const getResponse = (data,id,qid) => ({
  type: GET_RESPONSE,
  data,
  id,
  qid
})

export const responseReceived = (data) => ({
  type:RESPONSE_RECEIVED,
  data
})


export const excelReceivedData = (data) => ({
  type: EXCELDATA_RECEIVED,
  data
})


export const getExcelData = (data,id)=>({
  type: GET_EXCELDATA,
  data,
  id
})

export const getCreatedForms = (data)=>({
  type : GET_CREATEDFORMS,
  data
})

export const createdFormsReceived = (data)=>({
  type : CREATEDFORMS_RECEIVED,
  data
})