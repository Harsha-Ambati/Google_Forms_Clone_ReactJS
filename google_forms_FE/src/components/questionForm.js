//This page is used to generate questions
import React from "react";
import { useState, useEffect } from "react";
import "./questionForm.css";
import Select from "@material-ui/core/Select";
// import Select from 'react-select'
import Switch from "@material-ui/core/Switch";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BsTrash } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Checkbox, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ShortText from "@material-ui/icons/ShortText";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { IconButton } from "@material-ui/core";
import { Timer } from "@material-ui/icons";
import EventIcon from "@material-ui/icons/Event";
import { FileCopy } from "@material-ui/icons";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { RadioButtonChecked } from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useDispatch,useSelector } from "react-redux";
import {setQuestion} from "../Store/actions/questions";
// import history from "../history";
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import { Redirect } from "react-router-dom";

function QuestionForm() {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [formName, setFormName] = useState("Untitled Form");
  const [formDescription, setFormDesc] = useState("Add Description");
  const [questionType, setType] = useState("Text");
  const [questionRequired, setRequired] = useState("true");
  // const [type, setQuestiontype] = useState("Text")

  // const optionsV = [
  //   {
  //     value : "Text", label : "text"
  //   },
  //   {
  //     value : "Paragraph", label : "paragraph"
  //   },
  //   {
  //     value : "Radio", label : "radio"
  //   },
  //   {
  //     value : "Checkbox", label : "checkbox"
  //   },
  //   {
  //     value : "Date", label : "date"
  //   },
  //   {
  //     value : "Time", label : "time"
  //   },
  //   {
  //     value : "fl", label : "file"
  //   }

  // ]

     const handleChange = (change) => {
      setType(change);
    }

const formIdReceived = useSelector((state) => state.questionsReducer.formIdData);
const history = useHistory();

  useEffect(() => {
    let newQuestion = {
      questionText: "Question",
      answer: false,
      questionType : Text,
      options: [],
      open: true,
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  }, []);


  function onSubmit() {
    let createForm = {};
    for (let i = 0; i < questions.length; i++) {
      delete questions[i]["answer"];
      delete questions[i]["open"];
      var names = questions[i]["options"].map(function (item) {
        return item["optionText"];
      });
      questions[i].options = names;
      questions[i].question = questions[i].questionText;
      questions[i].question_type = questions[i].questionType;
      questions[i].is_mandatory = questions[i].required;
      delete questions[i]["questionText"];
      delete questions[i]["questionType"];
      delete questions[i]["questiontext"];
      delete questions[i]["required"];
      if (questions[i].question_type === "radio") {
        questions[i].question_type = "MC";
      } else if (questions[i].question_type === "checkbox") {
        questions[i].question_type = "CB";
      } else if (questions[i].question_type === "time") {
        questions[i].question_type = "TI";
      } else if (questions[i].question_type === "date") {
        questions[i].question_type = "DA";
      } else if (questions[i].question_type === "fl") {
        questions[i].question_type = "FU";
      } else if (questions[i].question_type === "text") {
        questions[i].question_type = "SA";
      } else if (questions[i].question_type === "paragraph") {
        questions[i].question_type = "PG";
      }
      createForm['questions']=questions;
      createForm['title'] = formName;
      createForm['description'] = formDescription;
      createForm['allowed_users'] = [];
    }
       dispatch(setQuestion(createForm));
        if(formIdReceived !== undefined){
        swal({ title: "URL is Here!",
    text: ("http://localhost:3000/form/" + formIdReceived + "/viewform"),
    }).then(open => {
      if (open) {
       window.open("http://localhost:3000/form/" + formIdReceived + "/viewform","_blank");
       history.push('/welcome');
     }
   });
  //  history.push('/form/create/'+ formIdReceived);
  }
      }


  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions((questions) => [
      ...questions,
      {
        questionText: "Question",
        answer : false,
        options: [],
        open: true,
        required: false,
      },
    ]);
  }

  function addQuestionType(i, type) {
    let qns = [...questions];
    qns[i].questionType = type;
    questions[i].options = [{ optionText: "Option 1" }];
    setQuestions(qns);
  }

  function addSingle(i, type) {
    let qns = [...questions];
    qns[i].questionType = type;
    questions[i].options = [];
    setQuestions(qns);
  }


  function deleteQuestion(i) {
    let qns = [...questions];
    if (questions.length > 1) {
      qns.splice(i, 1);
    }
    setQuestions(qns);
  }

  function handleOptionValue(text, i, j) {
    let optionsOfQns = [...questions];
    optionsOfQns[i].options[j].optionText = text;
    setQuestions(optionsOfQns);
  }

  function handleQuestionValue(text, i) {
    let optionsOfQns = [...questions];
    optionsOfQns[i].questionText = text;
    setQuestions(optionsOfQns);
  }

  function addOption(i) {
    let optionsofQns = [...questions];
    if (optionsofQns[i].options.length < 10) {
      optionsofQns[i].options.push({
        optionText: "Option" + (optionsofQns[i].options.length + 1),
      });
    } else {
      console.log("Maximum limit is 4 options");
    }

    setQuestions(optionsofQns);
  }


  function expandCloseAll() {
    let qns = [...questions];
    for (let j = 0; j < qns.length; j++) {
      qns[j].open = false;
    }
    setQuestions(qns);
  }

  function handleExpand(i) {
    let qns = [...questions];
    for (let j = 0; j < qns.length; j++) {
      if (i === j) {
        qns[i].open = true;
      } else {
        qns[j].open = false;
      }
    }
    setQuestions(qns);
  }

  function requiredQuestion(i) {
    let requiredQuestion = [...questions];
    requiredQuestion[i].required = !requiredQuestion[i].required;
    setQuestions(requiredQuestion);
  }

  function removeOption(i, j) {
    let optionsOfQns = [...questions];
    if (optionsOfQns[i].options.length > 1) {
      optionsOfQns[i].options.splice(j, 1);
      setQuestions(optionsOfQns);
    }
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    let items = [...questions];
    let itemF = reorder(items, result.source.index, result.destination.index);
    setQuestions(itemF);
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  function QuestionUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </div>
                <Accordion
                  onChange={() => {
                    handleExpand(i);
                  }}
                  expanded={questions[i].open}
                  className={questions[i].open ? "add_border" : ""}>
                 <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1}
                    style={{ width: "100%" }}>
                    {!questions[i].open ? (
                      <div className="saved_questions">
                        <Typography
                          style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            letterSpacing: ".1px",
                            lineHeight: "24px",
                            paddingBottom: "8px",
                          }}>
                          {i + 1}. {ques.questionText}
                        </Typography>

                        {ques.options.map((op, j) => (
                          <div key={j}>
                            <div style={{ display: "flex" }}>
                              <FormControlLabel
                                style={{
                                  marginLeft: "5px",
                                  marginBottom: "5px",
                                }}
                                disabled
                                control={
                                  <input
                                    type={ques.questionType}
                                    color="primary"
                                    style={{ marginRight: "3px" }}
                                    required={ques.type}
                                  />
                                }
                                label={
                                  <Typography
                                    style={{
                                      fontFamily: " Roboto,Arial,sans-serif",
                                      fontSize: " 13px",
                                      fontWeight: "400",
                                      letterSpacing: ".2px",
                                      lineHeight: "20px",
                                      color: "#202124",
                                    }}
                                  >
                                    {ques.options[j].optionText}
                                  </Typography>
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </AccordionSummary>
                  <div className="question_boxes">
                    {!ques.answer ? (
                      <AccordionDetails className="add_question">
                        <div>
                          <div className="add_question_top">
                            <input
                              type="text"
                              className="question"
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                            ></input>
                            <Select
                              className="select"
                              value={questions.questionType}
                              onChange= {(e) => handleChange(e.target.value)}
                              style={{ color: "#5f6368", fontSize: "15px" }}>
                              <MenuItem
                                id="text"
                                value="Text"
                                onClick={() => {
                                  addSingle(i, "text");
                                }}>
                                {" "}
                                <ShortText
                                  style={{ marginRight: "10px" }}
                                />{" "}
                                Short Answer
                              </MenuItem>
                              <MenuItem
                                id="paragraph"
                                value="Paragraph"
                                onClick={() => {
                                  addSingle(i,"paragraph");
                                }}>
                                {" "}
                                <SubjectIcon
                                  style={{ marginRight: "10px" }}
                                />{" "}
                                Paragraph
                              </MenuItem>
                              <MenuItem
                                id="radio"
                                value="Radio"
                                onClick={() => {
                                  addQuestionType(i, "radio");
                                }}>
                                {" "}
                                <RadioButtonChecked
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />{" "}
                                Multiple Choice
                              </MenuItem>
                              <MenuItem
                                id="checkbox"
                                value="Checkbox"
                                onClick={() => {
                                  addQuestionType(i, "checkbox");
                                }}
                              >
                                <CheckBoxIcon
                                  style={{
                                    marginRight: "8px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />{" "}
                                Checkboxes
                              </MenuItem>
                              <MenuItem
                                id="date"
                                value="Date"
                                onClick={() => {
                                  addSingle(i, "date");
                                }}
                              >
                                {" "}
                                <EventIcon
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                />{" "}
                                Date
                              </MenuItem>
                              <MenuItem
                                id="time"
                                value="Time"
                                onClick={() => {
                                  addSingle(i, "time");
                                }}>
                                {" "}
                                <Timer
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                />{" "}
                                Time
                              </MenuItem>
                              <MenuItem
                                id="file"
                                value="fl"
                                onClick={() => {
                                  addSingle(i,"fl");
                                }}
                              >
                                {" "}
                                <FileCopy
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                />{" "}
                                File
                              </MenuItem>
                            </Select>
                          </div>
                          {ques.options.length ? (
                            ques.options.map((op, j) => (
                              <div className="add_question_body" key={j}>
                                {ques.questionType !== "text" &&
                                (ques.questionType === "radio" ||
                                  ques.questionType === "checkbox" ||
                                  ques.questionType === "time" ||
                                  ques.questionType === "date" ||
                                  ques.questionType === "File") ? (
                                  <input
                                    type={ques.questionType}
                                    style={{ marginRight: "12px" }}
                                  />
                                ) : (
                                  <ShortTextIcon
                                    style={{ marginRight: "12px" }}
                                  />
                                )}
                                <div>
                                  <input
                                    type="text"
                                    className="text_input"
                                    value={ques.options[j].optionText}
                                    onChange={(e) => {
                                      handleOptionValue(e.target.value, i, j);
                                    }}
                                  ></input>
                                </div>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    removeOption(i, j);
                                  }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              </div>
                            ))
                          ) : (
                            <input
                              type={ques.questionType}
                              className="text_input"
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                            ></input>
                          )}
                          {ques.options.length < 10 &&
                          ques.options.length > 0 ? (
                            <div className="add_question_body">
                              <FormControlLabel
                                disabled
                                control={
                                  ques.questionType === "text" ? (
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      inputProps={{
                                        "aria-label": "secondary checkbox",
                                      }}
                                      style={{
                                        marginLeft: "0px",
                                        marginRight: "0px",
                                      }}
                                      disabled
                                    />
                                  ) : (
                                    <Button style={{ marginRight: "10px" }} />
                                  )
                                }
                                label={
                                  <div>
                                    <input
                                      type="text"
                                      className="text_input"
                                      style={{
                                        fontSize: "13px",
                                        width: "60px",
                                      }}
                                      placeholder=""
                                    ></input>
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        addOption(i);
                                      }}
                                      style={{
                                        textTransform: "none",
                                        color: "#4285f4",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Add Option
                                    </Button>
                                  </div>
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="add_footer">
                            <div className="add_question_bottom_left">
                            </div>
                            <div className="add_question_bottom">
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  deleteQuestion(i);
                                }}
                              >
                                <BsTrash />
                              </IconButton>
                              <span
                                style={{ color: "#5f6368", fontSize: "13px" }}
                              >
                                Required{" "}
                              </span>{" "}
                              <Switch
                                name="checkedA"
                                color="primary"
                                checked={ques.required}
                                onClick={() => {
                                  requiredQuestion(i);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    ) : (
                      ""
                    )}
                    {!ques.answer ? (
                      <div className="question_edit">
                        <AddCircleOutlineIcon
                          onClick={addMoreQuestionField}
                          className="edit"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_top_name"
                style={{ color: "black" }}
                placeholder={formName}
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                }}
              ></input>
              <input
                type="text"
                className="question_top_desc"
                placeholder="Form Description"
                value={formDescription}
                onChange={(e) => {
                  setFormDesc(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {QuestionUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="saveForm">
            <Button
              variant="contained"
              color="primary"
              style={{ fontSize: "14px" }}
              onClick={onSubmit}>
              Save
            </Button>
  
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;
