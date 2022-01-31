import React from "react";
const File = (props) => {
  const { register, required, name, type, id } = props;
  return (
    <div className="form-group ">
      <label htmlFor="file" />
      {
      required ? 
        <input
          type="file"
          className="form-control"
          id={id}
          {...register(`${name},${type}`, { required: "This field is required" })}
        />
       : 
        <input
          type="file"
          name={name}
          className="form-control"
          id={id}
          {...register(`${name},${type}`)}
        />
      }
    </div>
  );
};
export default File;
