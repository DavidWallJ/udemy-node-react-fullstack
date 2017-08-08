import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

// the user model from the backend is available on this.props.auth
class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				// we can't wrap this jsx in a div because we're dropping it into a list
				// this the array
				// react thinks arrays should have keys but this is really just a hack to get 2 items returned into a ul
				// thus the keys 1 and 2 are fine
				return [
					<li key="1">
						<Payment />
					</li>,
					<li key="3" style={{ margin: '0 15px' }}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="2">
						<a href="/api/logout">Logout</a>
					</li>
				];
		}
	}

	render() {
		return (
			<nav style={{ backgroundColor: '#d3d3d3' }}>
				<div className="nav-wrapper" style={{ padding: '0 10px' }}>
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
					>
						Email Assistant
					</Link>
					<ul id="nav-mobile" className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
