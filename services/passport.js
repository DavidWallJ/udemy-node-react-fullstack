const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// this is how we get the user mondel class
// we don't require it in to make things easier when if we do testing later
// this is the model that can be used to create an instance of User
const User = mongoose.model('users');

// serializeUser add's on an identifying piece of code
// so we can identify the user when they try and interact with out app
// something to be used as a cookie
passport.serializeUser((user, done) => {
	// this is not the 'profile.id'
	// after the user is signed in we only care about the mongo id
	// this is a shortcut to the id added by mongodb
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// already have a record with the given profile id
					// done tells passport to continue on
					// if we found a user there is no error
					// thus we assing 'null' to the first argument
					// we do need to pass the user on
					done(null, existingUser);
				} else {
					// we don't have a user record for this id
					// let's make a new record
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
