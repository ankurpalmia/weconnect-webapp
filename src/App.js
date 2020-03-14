import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import HomeContainer from './containers/HomeContainer';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Switch>
        <PublicRoute exact path="/" component={HomeContainer} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
