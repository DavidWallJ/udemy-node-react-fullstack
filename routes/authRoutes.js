const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			// what permissions we want
			// the ability to read the users profile and email address
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		req.logout();
		// we should see nothing because req.user no longer exists
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
