const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

// this loads the users model into mongoose
mongoose.model('users', userSchema);
