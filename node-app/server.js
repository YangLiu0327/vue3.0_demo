const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // use for post request
const app = express();
// import users.js
const users = require('./routers/api/users');

// DB config
const db = require('./config/keys').mongoURI;

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// connect to mongobd
mongoose.connect(db)
    .then(() => console.log('Mongodb Connected!'))
    .catch((error) => console.log(error))

app.get ('/', (req, res) => {
    res.send('hello world!')
})

app.use('/api/users', users);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

