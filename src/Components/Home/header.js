import React from 'react';
import {connect} from 'react-redux';

import './header.css';

export function Header(props) {
	return (
		<header className="sticky">
			<h1 className="section">{props.firstName}'s Team</h1>
		</header>
	);
}

const mapStateToProps = state => ({
	firstName: state.auth.currentUser.firstName,
});

export default connect(mapStateToProps)(Header);