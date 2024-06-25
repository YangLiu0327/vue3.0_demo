const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // use for post request
const app = express();
const passport = require('passport');

const users = require('./routers/api/users');
const profiles = require('./routers/api/profiles');
// DB config
const db = require('./config/keys').mongoURI;

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport initailize
app.use(passport.initialize());

// connect to mongobd
mongoose.connect(db)
    .then(() => console.log('Mongodb Connected!'))
    .catch((error) => console.log(error))

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

