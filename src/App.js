import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import HomeContainer from './containers/HomeContainer';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import { SIGNUP, LOGIN, SIGNUP_SUCCESS_PAGE, FEED_PAGE, PROFILE, RESPOND_REQUEST, EMAIL_VERIFY_PAGE } from './constants';
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import SignupSuccess from './containers/SignupSuccess';
import PrivateRoute from './components/PrivateRoute';
import FeedContainer from './containers/FeedContainer';
import { loadUser } from './actions/loadUser';
import { connect } from 'react-redux';
import ShowProfile from './containers/ShowProfile';
import Respond from './components/Respond';
import EmailVerification from './components/EmailVerification';

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
        <PrivateRoute exact path={`${PROFILE}:username`} component={ShowProfile} />
        <PrivateRoute exact path={FEED_PAGE} component={FeedContainer} />
        <Route exact path={RESPOND_REQUEST} component={Respond} />
        <Route exact path={EMAIL_VERIFY_PAGE} component={EmailVerification} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(null, { loadUser })(App);
