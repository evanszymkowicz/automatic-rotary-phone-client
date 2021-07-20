import React from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {toggleNavbar} from '../actions/index';
import './main.css';

export class Nav extends React.Component {
  componentWillUnmount(){
    this.props.dispatch(toggleNavbar(false));
  }

  render() {
    let className = this.props.toggleNavbar ? "show link" : "dont show link";
    return( 
      <nav className="navbar-main">
        <Link className="logo" to="/home">Roledex</Link>
        <button onClick={()=>this.props.dispatch(toggleNavbar())} className="icon right"><i className="fa fa-bars"></i></button>
         <div className = "right">
         <Link className={className} to ="/home">Home</Link>
         <Link className={className} to ="/about">About</Link>
         <Link className={className} to ="#">Settings</Link>
         <Link className={className} to ="#">Logout</Link> 
       </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  toggleNavbar: state.pawfile.toggleNavbar,
});

export default connect(mapStateToProps)(Navbar);