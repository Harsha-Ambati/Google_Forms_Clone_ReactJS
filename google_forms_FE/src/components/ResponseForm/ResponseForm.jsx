import React from "react";
// import { ViewResponse } from "./ViewResponse";
import "./ResponseForm.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResponse, getExcel } from "../../Store/actions/questions";

const ResponseDataForm = () => {
  const responseReceived = useSelector(
    (state) => state.questionsReducer.responseReceived
  );

  const dispatch = useDispatch();
  let data = [];
  let url = window.location.pathname;
  let urls = url.split("/");
  let id = urls[2];
  let qid = urls[3];

  useEffect(() => {
    dispatch(getResponse(data, id, qid));
  }, []);

  return (
    <>
      <div id="con">
        {responseReceived
          ? responseReceived.answers.map((field) => {
              let Question_type = field.answer_to.question_type;

              switch (Question_type) {
                case "SA":
                  return (
                    <div id="question_seperator">
                      <div>
                        <h3>{field.answer_to.question}</h3>
                        <p>{field.answer}</p>
                      </div>
                    </div>
                  );

                case "PG":
                  return (
                    <div id="question_seperator">
                      <div>
                        <h3>{field.answer_to.question}</h3>
                        <p>{field.answer}</p>
                      </div>
                    </div>
                  );

                case "MC":
                  return (
                    <div id="question_seperator">
                      <h3>{field.answer_to.question}</h3>
                      <p>{field.answer}</p>
                    </div>
                  );

                case "TI":
                  return (
                    <div id="question_seperator">
                      <h3>{field.answer_to.question}</h3>
                      <p>{field.time}</p>
                    </div>
                  );

                case "FU":
                  return (
                    <div id="question_seperator">
                      <h3>{field.answer_to.question}</h3>
                      <p>{field.file}</p>
                    </div>
                  );

                case "CB":
                  return (
                    <div id="question_seperator">
                      <h3>{field.answer_to.question}</h3>
                      <p>{field.multiple_answers}</p>
                    </div>
                  );

                case "DA":
                  return (
                    <div id="question_seperator">
                      <h3>{field.answer_to.question}</h3>
                      <p>{field.date}</p>
                    </div>
                  );

                default:
                  return (
                    <div>
                      <span>Error value</span>
                    </div>
                  );
              }
            })
          : ""}
      </div>
    </>
  );
};

export default ResponseDataForm;
