const express = require('express');
const mongoose = require('mongoose');
// cookie-session tells express we're using cookies
const cookieSession = require('cookie-session');
// we still need to tell passport we're using cookies
const passport = require('passport');
// body-parser is a middleware thus we must app.use
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// the order of these require statements matter!
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());
// app.use hookes up middlewares
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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// NODE_ENV is automatically set my heroku
if (process.env.NODE_ENV === 'production') {
	// if express doesn't recognize the route, first check the static folder and see if what we're looking is one of those
	// like our main.js and main.css files
	// files required to build the site
	app.use(express.static('client/build'));

	// next, if express doesn't recognize the route just assume react router is responsible for this
	// express will serve up the index.html file from the react build

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
