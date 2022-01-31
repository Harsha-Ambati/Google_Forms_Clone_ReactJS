// This page generates final submission message
import React from "react";
import { Typography } from "@material-ui/core";
import "./submitForm.css";
function SubmitForm() {
  return (
    <div className="submit">
      <div className="submit_form">
        <div className="submit_form_section">
          <div className="submit_title_section">
            <br></br>
            <Typography style={{ fontSize: "15px", fontWeight: "400" }}>
              Your response has been recorded.
            </Typography>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitForm;
