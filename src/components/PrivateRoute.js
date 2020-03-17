import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN } from "../constants";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  
    const loggedIn = useSelector(state => state.login.auth);
    console.log("in private route", loggedIn)

  return (
    <Route
      {...rest}
      render={props => {
        return loggedIn ? <Component {...props} /> : <Redirect to={LOGIN} />;
      }}
    />
  );
};

export default PrivateRoute;
