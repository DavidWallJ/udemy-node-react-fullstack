// Payments via stripe service
import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payment extends Component {
	render() {
		return (
			<StripeCheckout
				amount={500}
				token={token => console.log(token)}
				stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
			/>
		);
	}
}

export default Payment;
