import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ component: Component, auth, ...rest }) => {
    
//   const loggedIn = useSelector(state => state.user.userAuth);

  return (
  <Route
    {...rest}
    render={props => (
      false ? (
          <Redirect to="MyFeed" />
          ) : (
            <Component {...props} />
        )
    )}
  />
)};

export default PublicRoute;
