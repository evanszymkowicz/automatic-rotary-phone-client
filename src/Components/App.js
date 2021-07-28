import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import HomePage from './Home/homepage';
import LandingPage from './LandingPage/landingpage';


import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh(); //  refresh the auth token periodically
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh(); //  kills the refresh when logged out
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
      this.refreshInterval = setInterval(
          () => this.props.dispatch(refreshAuthToken()),
          60 * 60 * 1000 // One hour
      );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Header}></Route>
          <Route exact path="/home" component={LandingPage}></Route>
          <Redirect exact from="*" to="/home" />
          {/* user will be redirected to home page if attempting to find a page that doesn't exist yet*/}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.createUser !== null
});

export default connect(mapStateToProps)(App);