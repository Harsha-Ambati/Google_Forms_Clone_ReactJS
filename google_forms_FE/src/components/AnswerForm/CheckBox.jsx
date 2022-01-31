import React, { Fragment } from "react";
const CheckBox = ({ field, register, required, name, type }) => {
  return (
    <div>
      {field.options.map((option) => {
        return (
          <Fragment key={option.value}>
          {
           required  ?
              <input
                name={name}
                type="checkbox"
                id={option}
                value={option}
                {...register(`${name}`, {
                  required: "This field is required",
                })}
              />
              :
              <input
                type="checkbox"
                name={name}
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

export default CheckBox;
