// you must include this somewhere in your project
// server/index.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	credits: {
		type: Number,
		default: 0
	}
});

// this loads the users model into mongoose
mongoose.model('users', userSchema);
