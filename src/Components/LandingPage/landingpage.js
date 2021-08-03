import React from 'react';
import Nav from '../Navbar/navbar';
import Footer from '../Footer/footer';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BriefAbout from './briefabout';
import LoginForm from './login-form';

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
					<BriefAbout />
					<LoginForm />
        </main>
			<Footer	/>
    </div>
  );
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);