// keys.js
if (process.env.NODE_ENV === 'production') {
	// we are in production environment
	// heroku sets NODE_ENV
	module.exports = require('./prod');
} else {
	// we are in a development environment
	module.exports = require('./dev');
}
