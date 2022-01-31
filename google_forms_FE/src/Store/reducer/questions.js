import {
  SET_QUESTIONS,
  CHANGE_QUESTION_TYPE,
  SET_FORM_NAME,
  SET_FORM_DESC,
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
  GET_CREATEDFORMS,
  CREATEDFORMS_RECEIVED

} from "../actions/types";

export const initialState = {
  questions: [],
  form_name: "Untitled form ",
  form_desc: " Add the description ",
  questionsReceived: [],
  formIdReceived: [],
};

const questionsReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };

    case GET_QUESTIONS:
      return {
        ...state,
        data: action.data,
        id: action.id,
      };
    case SEND_QUESTIONS:
      return {
        ...state,
        data: action.data,
        id: action.id,
      };

    case QUESTIONS_RECEIVED:
      console.log(action);
      return {
        ...state,
        questionsReceived: action.data,
      };

    case FORM_RECEIVED:
      return {
        ...state,
        formIdReceived: action.data,
        formIdData: action.data.questions[0].form,
      };

    case SEND_ANSWERS:
      return {
        ...state,
        sendAnswers: action.data,
        id: action.id,
      };

    case CHANGE_QUESTION_TYPE:
      return {
        ...state,
        questionType: action.questionType,
      };

    case SET_FORM_NAME:
      return {
        ...state,
        form_name: action.form_name,
      };

    case SET_FORM_DESC:
      return {
        ...state,
        form_desc: action.form_desc,
      };

    case GET_RESPONSES:
      return {
        ...state,
        data: action.data,
        id: action.id,
      };
    case RESPONSES_RECEIVED:
      return {
        ...state,
        responsesReceived: action.data,
      };

    case GET_RESPONSE:
      return {
        ...state,
        data: action.data,
        id: action.id,
        qid: action.qid,
      };
    case RESPONSE_RECEIVED:
      return {
        ...state,
        responseReceived: action.data,
      };

    case EXCELDATA_RECEIVED:

      return{
        ...state,
       excelReceivedData : action.data,
      }
      case GET_EXCELDATA:
        return{
          ...state,
          data : action.data,
          id : action.id
        }
    case CREATEDFORMS_RECEIVED:
      return{
        ...state,
        createdFormsReceived : action.data,
      }

    case GET_CREATEDFORMS:
      return{
        ...state,
        data : action.data,
      }
    default:
      return state;
  }
};

export default questionsReducer;
