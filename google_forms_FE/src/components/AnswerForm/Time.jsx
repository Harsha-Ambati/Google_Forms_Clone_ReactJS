import React from "react";
const Time = (props) => {
  const { register, required, name, id, type } = props;
  return (
    <div className="form-group ">
      <label htmlFor="time" />
      {required  ? 
        <input
          type="time"
          className="form-control"
          id={id}
          {...register(`${name}`, { required: "This field is required" })}
        />
       : 
        <input
          type="time"
          name = {name}
          className="form-control"
          id={id}
          {...register(`${name}`)}
        />
      }
    </div>
  );
};

export default Time;
