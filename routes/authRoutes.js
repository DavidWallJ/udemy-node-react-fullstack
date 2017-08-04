const passport = require('passport');

// these routes need to be required into your index.js file
module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			// what permissions we want
			// the ability to read the users profile and email address
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			// passport puts a redirect function on the res
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		// we should see nothing because req.user no longer exists
		res.redirect('/');
	});

	// The result of the serializeUser method in passport.js is attached to the req.user
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
