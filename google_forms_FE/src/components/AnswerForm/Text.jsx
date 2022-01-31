import React from "react";
import { TextField } from "@material-ui/core";


const Input = (props) => {
  const { register, required,id, name, type } = props; 

  return (
    <div className="form-group ">
      <label htmlFor="name" />
      {
      required ? 
        <TextField
          className="form-control"
          name={name}
          id={id}
          {...register(`${name}`, {required : "This field is required"})}
        />
       : 
        <TextField
          className="form-control"
          id={id}
          name={name}
          {...register(`${name}`)}
        />
      }
    </div>
  );
};

export default Input;
