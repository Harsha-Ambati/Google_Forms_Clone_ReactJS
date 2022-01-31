import React from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getResponses, getExcelData } from "../../Store/actions/questions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UsersList = () => {
  const dispatch = useDispatch();
  const responsesReceived = useSelector(
    (state) => state.questionsReducer.responsesReceived);

const history = useHistory();

  let data = [];
  let url = window.location.pathname;
  let urls = url.split("/");
  let id = urls[2];


  useEffect(() => {
    dispatch(getResponses(data, id));
  }, []);

 const getExcelInfo = () => {
   let data = []
   dispatch(getExcelData(data,id));
   setTimeout(function(){
     window.open("http://127.0.0.1:8000/media/" + id + ".csv");
   },[1000])
   
  }
  const goHome = () => {
    history.push('/welcome');
  }

  const renderData = (info,index)=>{
    return(
      <tr key={index}>
        <td>{info.user}</td>
        <td>{info.id}</td>
        <td>
        <Link  to={`/form/${id}/${info.id}/viewresponse`}>View</Link></td>
      </tr>
    )
  }



  return (
    <>
      <h4>
        <button onClick={goHome} id="home-btn">Back to home</button>
      </h4>
      <h4>
      <button onClick={getExcelInfo}>Download</button>
      </h4>
      <div id="container-1">
        <table class="table-border">
          <thead class="black-border">
            <tr>
              <th>UserName</th>
              <th>ID</th>
              <th>Responses</th>
            </tr>
          </thead>
          <tbody class="t-body">
            {responsesReceived ? responsesReceived.map(renderData) : ""}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;

