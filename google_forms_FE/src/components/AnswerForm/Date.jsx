import React from "react";

const Date = (props) => {
  const {register,required,name,type,id} = props;
  return (

    <div className="form-group ">
      <label htmlFor="Date" />
      {
        required ? 
        <input
          type="date"
          name={name}
          className="form-control"
          id={id}
          {...register(`${name}`, {required : "This field is required" })}
        />
       : 
        <input
          type="date"
          name={name}
          className="form-control"
          id={id}
          {...register(`${name}`)}
        />
      }
    </div>
  );
};
export default Date;
