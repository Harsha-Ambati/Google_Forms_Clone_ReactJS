import "./LoginandSignup.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@material-ui/core";
import { useDispatch,useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import signupRequest from "../Store/actions/signup"
import swal from 'sweetalert';


const Signup = () => {
  const dispatch = useDispatch();
  const requestState = useSelector((state)=>state.signupReducer.requesting);
  const successState = useSelector((state)=>state.signupReducer.successful);
  const [credentials, setCredentials] = useState({
    first_name: "",
    username: "",
    password: "",
  });

  const schema = yup.object().shape({
  first_name: yup.string().min(3).required(),
  username: yup.string().min(3).required(),
  password: yup.string().min(6).max(32).required(),
});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    dispatch(signupRequest(data));
  };


    if(requestState === false && successState === true){
      swal({
        title: "Signup",
        text : "Successfull!!",
        icon : "success",
      });
      localStorage.clear();
      window.location.reload(true);
    }else if(requestState === true && successState === false){
      swal({
        title: "Signup",
        text : "User already registered!",
        icon : "error",
      });
    }
    
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} id="sign-up">
      <h1>Sign Up</h1>

      <br />
      <TextField
        {...register("first_name")}
        placeholder="Name"
        type="text"
        required
        onChange={(e) =>
          setCredentials({ ...credentials, name: e.target.value })
        }
      />
      <p>{errors.name?.message}</p>
      <br />

      <TextField
        {...register("username")}
        placeholder="Username"
        type="text"
        required
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <p>{errors.username?.message}</p>
      <br />

      <TextField
        {...register("password")}
        placeholder="Password"
        type="password"
        required
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <p>{errors.password?.message}</p>
      <br />
      <div>
        <errors>{errors.Response}</errors>
      </div>
      <button type="submit" id="login-btn">
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
