import { useSelector } from "react-redux";
import React from "react";
import LogoutBar from "../components/LogoutTab";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import SubmitForm from "../components/submitForm";
import RespondedForm from "../components/respondedForm";
import Welcome from "../components/Welcome";
import ErrorRoute from "./errorRoute";
import CombineTabs from "../components/MainPage";
import RenderDetails from "../components/AnswerForm/AnswerForm";
import ResponseDataForm from "../components/ResponseForm/ResponseForm";
import UsersList from "../components/ResponseForm/UsersList";
import Home from "../components/Home";

const AuthenticatedRoutes = () => {
  const isAuthenticated = useSelector(
    (state) => state.loginReducer.isAuthenticated
  );
  const routeAuthenticator = () => {
    return isAuthenticated;
  };

  return (
    <>
      <Router>
        <LogoutBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/welcome"
            render={() =>
              routeAuthenticator() ? <Welcome /> : <Redirect to="/" />
            }
          />
          <Route
            path="/form/create"
            render={() =>
              routeAuthenticator() ? <CombineTabs /> : <Redirect to="/" />
            }
          />
          <Route
            path="/form/:id/viewresponses"
            render={() =>
              routeAuthenticator() ? <UsersList /> : <Redirect to="/" />
            }
          />
          <Route
            path="/form/:id/:id/viewresponse"
            render={() =>
              routeAuthenticator() ? <ResponseDataForm /> : <Redirect to="/" />
            }
          />
          <PrivateRoute path="/form/:id/viewform"> </PrivateRoute>
          <Route
            path="/form/submit/"
            render={() =>
              routeAuthenticator() ? <SubmitForm /> : <Redirect to="/" />
            }
          />
          <Route
            path="/form/responded/"
            render={() =>
              routeAuthenticator() ? <RespondedForm /> : <Redirect to="/" />
            }
          />
          <Route path="">
            <ErrorRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            <RenderDetails />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
};

export default AuthenticatedRoutes;
