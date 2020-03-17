import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { FEED_PAGE } from "../constants";

const PublicRoute = ({ component: Component, auth, ...rest }) => {
    
  const loggedIn = useSelector(state => state.login.auth);

  console.log("in public route", loggedIn);

  return (
  <Route
    {...rest}
    render={props => (
      loggedIn ? (
          <Redirect to={FEED_PAGE} />
          ) : (
            <Component {...props} />
        )
    )}
  />
)};

export default PublicRoute;
