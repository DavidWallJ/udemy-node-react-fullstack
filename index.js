const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// the order of these require statements matter!
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

// this is a way to import authRoutes
// and pass an argument to the exported function
// and immediately run it
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
