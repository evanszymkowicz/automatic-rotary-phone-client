import React from 'react';
import { connect } from 'react-redux';
import {changeSuccessMessage} from '../../actions/auth';

import Nav from '../Navbar/navbar';
import Footer from '../Footer/footer';
import AccountInfoForm from './acount-info-form';
import ChangePasswordForm from './change-password-form';
import requiresLogin from '../requires-login';

import './settings-page.css';

export class SettingsPage extends React.Component {
	componentDidMount() {
		document.title = 'Settings';
	}
	//	Pin this to the top of the page on render
	componentDidUpdate() {
		window.scrollTo(0, 0);	
		if(this.props.succesMessage){
			//	timer that resets the message to null after 10 seconds
			setTimeout(
				function(){
					this.props.dispatch(changeSuccessMessage(null));
				}.bind(this), 
			10000
			);
		}
	}
	render()	{
		return(
			<div className="settings">
				<Nav />
				<main className="settings-main-section">
					{this.props.succesMessage && 
						<div className="settings-main-success-message" aria-live="polite">
							{this.props.successMessage}
						</div> 
						}
						<AccountInfoForm	/>
						<ChangePasswordForm />
				</main>
				<Footer	/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	successMessage: state.auth.succesMessage,
});

export default requiresLogin()(connect(mapStateToProps)(SettingsPage));