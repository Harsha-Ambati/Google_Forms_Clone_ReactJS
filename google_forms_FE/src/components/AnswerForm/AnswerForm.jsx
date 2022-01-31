import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckBox from "./CheckBox";
import Radio from "./Radio";
import Input from "./Text";
import Date from "./Date";
import File from "./File";
import "./AnswerForm.css";
import Time from "./Time";
import moment from 'moment'
import Para from "./Para";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import {
  getQuestions,
  sendAnswers,
} from "../../Store/actions/questions";

const RenderDetails = () => {
    let history = useHistory();
  const dispatch = useDispatch();

  const questionsReceived = useSelector(
    (state) => state.questionsReducer.questionsReceived
  );


if(questionsReceived.message === "user already filled response"){
      history.push("/form/responded");
}
  let url = window.location.pathname;
  let urls = url.split("/");
  let id = urls[2];

  useEffect(() => {
    //   This useEffect is executed on ComponentMount. So, Here I will fetch the form data from api. For now iam using the dummy data
    dispatch(getQuestions(questionsReceived, id));
  }, []);

  const onSubmitHandler = (data) => {

    var li = Object.keys(data);
    for (var i = 0; i < li.length; i++) {
      li[i] = li[i].split(",");
    }
    var list = Object.values(data);
    var answers = [];
    for (var i = 0; i < li.length; i++) {
        let checkDate = moment(list[i], "YYYY-MM-DD", true).isValid();
        let checkTime = moment(list[i],"HH:mm").isValid();
      var newobj = new Object();
      if(checkDate){
        newobj["answer_to"] = parseInt(li[i][0]);
        newobj["answer"] = null;
        newobj["multiple_answers"] = null;
        newobj["file"] = null;
        newobj["date"] = list[i];
        newobj["time"] = null;
      }
      else if(checkTime){
        newobj["answer_to"] = parseInt(li[i][0]);
        newobj["answer"] = null;
        newobj["multiple_answers"] = null;
        newobj["file"] = null;
        newobj["date"] = null;
        newobj["time"] = list[i];
      }
        else if (li[i][1] === "FU") {
        newobj["answer_to"] = parseInt(li[i][0]);
        newobj["answer"] = null;
        newobj["multiple_answers"] = null;
        newobj["file"] = list[i];
        newobj["date"] = null;
        newobj["time"] = null;
      }
      else if(typeof list[i] === 'object'){
        newobj["answer_to"] = parseInt(li[i][0]);
        newobj["answer"] = null;
        newobj["multiple_answers"] = list[i];
        newobj["file"] = null;
        newobj["date"] = null;
        newobj["time"] = null;
      } 
    
      else{
        newobj["answer_to"] = parseInt(li[i][0]);
        newobj["answer"] = list[i];
        newobj["multiple_answers"] = [];
        newobj["file"] = null;
        newobj["date"] = null;
        newobj["time"] = null;
      }

      answers.push(newobj);
    }
    var newdata = new Object();
    newdata["answers"] = answers;
    data = newdata;
    dispatch(sendAnswers(data, id));
    history.push('/form/submit');
  };

  const { register,  formState: { errors }, handleSubmit } = useForm();

  return (
    <>
      <div id="container">
        <h1>{questionsReceived.title}</h1>
        <h5>{questionsReceived.description}</h5>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          {questionsReceived.questions && questionsReceived
            ? questionsReceived.questions.map((field) => {
                let { question_type } = field;
                switch (question_type) {
                  case "SA":
                    return (
                      <div>
                        <h2>
                        <span>{
                field.is_mandatory ? field.question + "*" : field.question}
                        </span></h2>
                        <Input
                          required={field.is_mandatory}
                          name={field.id}
                          register={register}
                          type={field.question_type}
                        />
                          <ErrorMessage errors={errors} name={`${field.id}`} as="p"/> 
                      </div>
                    );
                  case "PG":
                    return (
                      <div id="para">
                        <h2>
                        <span>{
                field.is_mandatory ? field.question + "*" : field.question}
                        </span></h2>
                        <Para 
                          register={register}
                          required={field.is_mandatory}
                          name={field.id}
                          type={field.question_type}
                        />
                          <ErrorMessage errors={errors} name={`${field.id}`} as="p"/>
                      </div>
                    );
                  case "CB":
                    return (
                      <div id="checkbox">
                        <h2>
                        <span>{
                field.is_mandatory ? field.question + "*" : field.question}
                        </span></h2>
                        <CheckBox
                          field={field}
                          register={register}
                          required={field.is_mandatory}
                          name={field.id}
                          type={field.question_type}
                        />
                          <ErrorMessage errors={errors} name={`${field.id}`} as="p"/>
                      </div>
                    );
                  case "MC":
                    return (
                      <div id="radio">
                       <h2>
                        <span>{
                field.is_mandatory ? field.question + "*" : field.question}
                        </span></h2>
                        <Radio
                          register={register}
                          field={field}
                          required={field.is_mandatory}
                          name={field.id}
                          type={field.question_type}
                        />
                          <ErrorMessage errors={errors} name={`${field.id}`} as="p"/>
                      </div>
                    );
                  case "TI":
                    return (
                      <div id="time">
                        <h2>
                        <span>{
                field.is_mandatory ? field.question + "*" : field.question}
                        </span></h2>
                        <Time
                          register={register}
                          required={field.is_mandatory}
                          name={field.id}
                          type={field.question_type}
                        />
                         <ErrorMessage errors={errors} name={`${field.id}`} as="p"/>
                      </div>
                    );
                  case "DA":
                    return (
                      <div id="date">
                        <h2>
                        <span>{
                field.is_mandatory ? field.question + "*" : field.question}
                        </span></h2>
                        <Date
                          register={register}
                          required={field.is_mandatory}
                          name={field.id}
                          type={field.question_type}
                        />
                         <ErrorMessage errors={errors} name={`${field.id}`} as="p"/>
                      </div>
                    );
                  case "FU":
                    return (
                      <div id="file">
                        <h2>
                        <span>{
                field.is_mandatory ? field.question + "*" : field.question}
                        </span></h2>
                        <File
                          register={register}
                          required={field.is_mandatory}
                          name={field.id}
                          type={field.question_type}
                        />{" "}
                        <br />
                      </div>
                    );
                  default:
                    return (
                      <div>
                        <span>Invalid value</span>
                      </div>
                    );
                }
              })
            : ""}
          <br />
          <button id="btn-submit" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default RenderDetails;
