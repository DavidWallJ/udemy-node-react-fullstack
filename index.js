const express = require('express');
require('./services/passport');

const app = express();

// this is a way to import authRoutes
// and pass an argument to the exported function
// and immediately run it
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
