import React from 'react';
import {connect} from 'react-redux';
import Nav from '../Navbar/navbar';
import Footer from '../Footer/footer';
import MyFiles from './my-userfiles';

import { changeSortingUsersMethod } from '../../actions/index';
import { fetchUserfiles } from '../../actions/userfile-crud';
import { changeSuccessMessage } from '../../actions/auth';
import requiresLogin from '../requires-login';

export class HomePage extends React.Component {
	componentDidMount() {
		document.title = this.props.firstName ? `${this.props.firstName}'s Team` : 'Full Roster';
		this.props.dispatch(fetchUserfiles());
		this.props.dispatch(changeSuccessMessage(null));
	}

	componentWillUnmount() {
		this.props.dispatch(changeSortingUsersMethod(""));
	}

	componentDidUpdate() {
		document.title = this.props.firstName ? `${this.props.firsName}'s Team` : 'Full Roster';
	}

	render() {
		return (
			<div className="home">
				<Nav />
				<MyFiles />
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	firstName: state.auth.currentUser.firstName,
});

export default requiresLogin()(connect(mapStateToProps)(HomePage));