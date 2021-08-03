import React from 'react';
import './brief-about.css';

export default class AboutPage extends React.Component {
	render(){
		return (
			<div className="brief-about">
				<div className="welcome-center">
					<h1>Access Your Userfiles</h1>
					 <p>
            Let's make it easier to document and track what's new.
          </p>
          <h3>What You Can Do:</h3>
          <ul>
						<li>Create posts to document issues, fixes and implementations.</li>
            <li>Create reminders for each pet with optional time and date</li>
            <li>Search for a post or reminder</li>
            <li>Keep as many organized userfiles as you want</li>
					</ul>
				</div>
			</div>
		);
	}
}