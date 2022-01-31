import "./LoginandSignup.css";
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import {  Redirect } from 'react-router-dom';
import loginRequest from "../Store/actions/login";
import swal from 'sweetalert';
import { useLocation,useHistory } from 'react-router-dom'


const Login = () => {
  const  history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  // const {state} = location;

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.loginReducer.isAuthenticated);
  const request = useSelector((state)=> state.loginReducer.requesting);
  const success = useSelector((state)=> state.loginReducer.successful);
  const [credentials, setCredentials] = useState({
    username : "",
    password : "",
  });

  const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).max(32).required(),
});

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
  dispatch(loginRequest(data));
  };
     if(isAuthenticated ===  true && success === true && request === true){
        swal({
        title : "Login",
        text : "you are now logged in!",
        icon : 'success'
      });
         if(from.pathname.includes("/viewform")){
         return <Redirect to = {from.pathname}/>
       }
  else{
      return <Redirect to = "/welcome" />
  }
    } else if(request === true && isAuthenticated === false){
      swal({
        title : "Login",
        text : "Error Please check your credentials once again!",
        icon : 'error'
      });
    } 
  


  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} id="sign-in">
      <h1>Log In</h1>
      <br />

      <TextField {...register("username")} placeholder="username" type="text" required 
      onChange={(e) => setCredentials({...credentials, username:e.target.value})}/>
      <p>{errors.username?.message}</p>
      <br />

      <TextField
        {...register("password")}
        placeholder="password"
        type="password"
        required
        onChange={(e) => setCredentials({...credentials, password:e.target.value})}
      />
      <p>{errors.password?.message}</p>
      <br />

      <button type="submit" id="login-btn">log in</button>
    </form>
  );
}

export default Login;