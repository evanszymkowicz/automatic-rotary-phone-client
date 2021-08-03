import React from 'react';
import {connect} from 'react-redux';
import UserfileBio from '../userfile-bio';
import ReminderNote from '../reminder-note';

export class Sidebar extends React.Component {
	componentDidMount(){
		document.title = this.props.individualUserfile.name ? `${this.props.individualUserfile.name}` : "Staff";
	}
	componentDidUpdate(){
		document.title = this.props.individualUserfile.name ? `${this.props.individualUserfile.name}` : "Staff";
	}

	render(){
		//	do this for unvalid/unknown 
		if(this.props.userfilesPending){
      return(
				<aside className="sidebar left"></aside>); 
  }
	if(!this.props.individualUserfile.name){
    return (
      <p></p>
    );
  }
 return(
  <aside className="sidebar left"> 
    <div className="center-me">
      <UserfileBio {...this.props.individualUserfile}/>
            <ReminderNote {...this.props.individualUserfile} />
          </div>
        </aside>      
      );
  }
}

Sidebar.defaultProps= {
  individualUserfile: {}
}

const mapStateToProps = (state, props) => ({
  //find the userfile with an id equal to the one passed down in props
  individualUserfile: state.userfile.userfiles.find(userfile=>userfile.id==props.id),
  userfilesPending: state.userfile.userfilesPending,
});

export default connect(mapStateToProps)(Sidebar);