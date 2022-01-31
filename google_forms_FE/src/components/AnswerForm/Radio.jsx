import React, { Fragment } from "react";

const Radio = ({ field, register, required,name, type }) => {
  return (
    <div>
      {field.options.map((option) => {
        return (
          <Fragment key={option.value}>
            {required  ? 
              <input
                type="radio"
              name={name}
                value={option}
                id={option}
                {...register(`${name}`, {
                  required: "This field is required",
                })}
              />
             : 
              <input
                type="radio"
                name = {name}
                id={option}
                value={option}
                {...register(`${name}`)}
              />      
            }
            {option}
            <br />
          </Fragment>
        );
      })}
    </div>
  );
};

export default Radio;
