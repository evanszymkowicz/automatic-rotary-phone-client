import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Nav from './navbar'

import './landing-page.css';

export function LandingPage(props) {
	if (props.loggedIn) {
		console.log('logged in');
		return <Redirect to="/home" />;
	}

	return (
    <div className="landing-page">
		  <Nav />
        <main className="landing-page-main">
        
          </main>
       
        </div>
    );
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);