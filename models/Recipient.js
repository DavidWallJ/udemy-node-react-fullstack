// you do NOT need to require this into the index.js file like the other models
// because it's nested within 'Surveys' which is already included
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

// we're exporting this instead of 'moogoose.model' because
// it's going to be nexted within 'Survey.js'
module.exports = recipientSchema;
