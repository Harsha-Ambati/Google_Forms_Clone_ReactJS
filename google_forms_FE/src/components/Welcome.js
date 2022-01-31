//This page helps to create new form post login
import React from "react";
import { useHistory } from "react-router-dom";
import "./Welcome.css";
import blank from "../Imgs/blank.png";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getCreatedForms} from '../Store/actions/questions';
import { Link } from "react-router-dom";


function Welcome() {
  const history = useHistory();
 const dispatch = useDispatch();
  function createNewForm() {
    history.push("/form/create/");
  }

const formValues = useSelector((state)=>state.questionsReducer.createdFormsReceived)
   useEffect(()=>{
   dispatch(getCreatedForms());
   },[])

     const renderData = (info,index)=>{
    return(
      <tr key={index}>
        <td>{info.title}</td>
        <td><button id="formvalues">
          <Link to={`/form/${info.link}/viewresponses`}>View</Link>
        </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="template_outside">
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <p style={{ color: "#202124", fontSize: "25px" }}>Start a new form</p>
        </div>
      </div>
      <div className="template_body">
        <div className="card" onClick={createNewForm}>
          <img src={blank} className="card_image" style={{}} />
          <p className="title">Blank</p>
        </div>
      </div>

      <div className="template_bottom">
        <div className="template_right">
        </div>
      </div>
    </div>
    <div className="new_form">
    <p style={{ color: "#202124", fontSize: "25px" }}>Forms created by you</p>
     <div>
        <table class="table-border">
          <thead>
            <tr>
              <th>Form Title</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody class="t-body">
            {formValues ? formValues.map(renderData) : ""}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Welcome;
