import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import HomeContainer from './containers/HomeContainer';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import { SIGNUP, LOGIN, SIGNUP_SUCCESS_PAGE, FEED_PAGE, PROFILE } from './constants';
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import SignupSuccess from './containers/SignupSuccess';
import PrivateRoute from './components/PrivateRoute';
import FeedContainer from './containers/FeedContainer';
import { loadUser } from './actions/loadUser';
import { connect } from 'react-redux';

function App(props) {

  useEffect(() => {
    props.loadUser();
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <PublicRoute exact path="/" component={HomeContainer} />
        <PublicRoute exact path={SIGNUP} component={SignupContainer} />
        <PublicRoute exact path={LOGIN} component={LoginContainer} />
        <PublicRoute exact path={SIGNUP_SUCCESS_PAGE} component={SignupSuccess} />
        <PrivateRoute exact path={`${PROFILE}:username`} component="" />
        <PrivateRoute exact path={FEED_PAGE} component={FeedContainer} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(null, { loadUser })(App);
