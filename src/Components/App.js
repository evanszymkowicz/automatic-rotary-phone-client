import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './home/homepage';
import AutomaticRotaryPhonePage from './AutomaticRotaryPhonePage/AutomaticRotaryPhonePage';
import {Redirect, Switch} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/:automaticrotaryphoneId" component={AutomaticRotaryPhonePage}></Route>
          <Redirect exact from="*" to="/home" />
          {/* if user tries to access a route that doesn't exist, they will be redirected to home page */}
        </Switch>
      </Router>
    );
  }
}