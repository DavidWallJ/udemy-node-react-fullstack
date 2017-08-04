const keys = require('../config/keys');
// you can pull this line straight from the stripe documentation
// https://stripe.com/docs/api/node#create_charge
const stripe = require('stripe')(keys.stripeSecretKey);
// our middle ware is passed as a function to the express app.post request
const requireLogin = require('../middlewares/requireLogin');

// these routes need to be required into your index.js file
// express does not parse post requests by default
// we must use body-parser if we want to see the contents of the request body
// body-parser will put it on the 'req.body' property
module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// stripe integration server side
		// the console.log will be on the backend NOT the frontend
		// check your terminal
		// console.log(req.body);
		// Note: stripe returns a promise
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: 'Five dollars worth of credit',
			source: req.body.id
		});
		//console.log(charge);
		// to get the currently signed in user through passport we can access the req.user property
		req.user.credits += 5;
		// save off of the user model returns the updated user model
		const user = await req.user.save();

		res.send(user);
	});
};
