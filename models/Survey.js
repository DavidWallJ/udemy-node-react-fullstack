// you must include this somewhere in your project
// server/index.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	// setting up a relationship between Survey and User
	// the _ isn't required but by convention this shows it's a relationship reference field
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	// dates automatically recorded
	dataSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);
