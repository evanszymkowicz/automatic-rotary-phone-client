import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './home/homepage';
import AutomaticRotaryPhonePage from './AutomaticRotaryPhonePage/AutomaticRotaryPhonePage';
import {Redirect, Switch} from 'react-router-dom';

//  TODO: Come back to this comeponent route
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/:automaticrotaryphoneId" component={AutomaticRotaryPhonePage}></Route>  
          <Redirect exact from="*" to="/home" />
        </Switch>
      </Router>
    );
  }
}