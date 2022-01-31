import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";


const Home = () => {
  return (
    <AppBar>
      <Toolbar>
        <React.Fragment>
          <Link to="/login">
            <Button
              style={{ marginRight: "450px" }}
              variant="contained"
              className="btn1">
              Login
            </Button>
          </Link>
          <h3 style={{ marginLeft: "250px" }} id="title-form">
            Welcome to the new Form Application
          </h3>
          <Link to="/signup">
            <Button
              style={{ marginLeft: "600px" }}
              variant="contained"
              className="btn1">
              Signup
            </Button>
          </Link>
        </React.Fragment>
      </Toolbar>
    </AppBar>
  );
};

export default Home;


