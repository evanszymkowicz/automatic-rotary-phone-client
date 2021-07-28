import React from 'react';
import {connect} from 'react-redux';
import { changeCategoryFilter, changeCurrentUserId, changeSearchTerm, showMemoryForm, showUserfileForm } from '../../actions';
import Nav from '../Navbar/navbar';

export default class UserfilePage extends React.Component {
	componentDidMount() {
		window.scrollTo(0, 0);	//	will always load at the top of the page
		this.props.dispatch(changeCurrentUserId(this.props.match.params.userfileId));
		this.props.dispatch(fetchUserfiles());
		this.props.dispatch(changeSuccessMessage(null));
	}

	componentWillUnmount() {
		//	returns to the default when this component unmounts
		this.props.dispatch(showUserfileForm(false));
		this.props.dispatch(showMemoryForm(false));
		this.props.dispatch(changeSearchTerm(""));
		this.props.dispatch(changeCategoryFilter(""));
	}

	validId(paramsId) {
		return this.props.userfiles.find(userfile => userfile.id==paramsId)
	}

	//	redirect user here for deleted/unknown/no longer exists user
	render() {
		if (!this.validId(this.props.match.params.userfileId)) {
			return (
				<div className="userfile-page">
					<Nav />
          <Footer />
				</div>
			);
		}
		return (
			<div className="userfile-page">
			<Navbar/>
        <Sidebar id={this.props.match.params.userfileId}/>
        <MainSection id={this.props.match.params.userfileId}/>
					{this.props.showUserfileForm && <UserfileForm/>} 
					{this.props.showUpdatePhotoForm && <UpdatePhotoForm/>} 
					{this.props.showMemoryForm && <MemoryForm/>}
        <Footer/>
			</div>
		);
	}
}