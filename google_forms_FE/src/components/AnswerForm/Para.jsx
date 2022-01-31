import React from "react";
import { TextField } from "@material-ui/core";

const Para = (props) => {
  const { register,required,name,type,id } = props;
  return (
    <div className="form-group ">
      <label htmlFor="name" />
      {
        required  ? 
        <TextField
          name="paragraph"
          className="form-control"
          id={id}
          {...register(`${name}`, { required: "This field is required" })}
        />
       : 
        <TextField
          name={name}
          className="form-control"
          id={id}
          {...register(`${name}`)}
        />
      }
    </div>
  );
};
export default Para;
