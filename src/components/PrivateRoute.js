import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN } from "../constants";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  
    const loggedIn = useSelector(state => state.login.auth);

  return (
    <Route
      {...rest}
      render={props => {
        if(loggedIn === null) return <div>Loading...</div>
        return loggedIn ? <Component {...props} /> : <Redirect to={LOGIN} />;
      }}
    />
  );
};

export default PrivateRoute;
