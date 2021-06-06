import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { FEED_PAGE } from "../constants";
import { Spinner } from "reactstrap";

const PublicRoute = ({ component: Component, auth, ...rest }) => {
    
  const loggedIn = useSelector(state => state.login.auth);

  return (
  <Route
    {...rest}
    render={props => {if(loggedIn === null) return <Spinner color="primary" />
    return(
      loggedIn ? (
          <Redirect to={FEED_PAGE} />
          ) : (
            <Component {...props} />
        )
    )}}
  />
)};

export default PublicRoute;
