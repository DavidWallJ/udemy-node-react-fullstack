const express = require('express');
const mongoose = require('mongoose');
// cookie-session tells express we're using cookies
const cookieSession = require('cookie-session');
// we still need to tell passport we're using cookies
const passport = require('passport');
const keys = require('./config/keys');
// the order of these require statements matter!
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(
	cookieSession({
		// the length of time the cookie is valid
		// one month in milliseconds
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// here is where we encrypt our cookie
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// this is a way to import authRoutes
// and pass an argument to the exported function
// and immediately run it
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
