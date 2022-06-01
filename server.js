const express = require("express");
const mongoose = require("mongoose");
const pandits = require('./routes/api/pandits');
const authsPandit = require('./routes/api/authPandit');
const users = require('./routes/api/users');
const authsUser = require('./routes/api/authUser');
const profile = require('./routes/api/profile');
const appointment = require('./routes/api/appointment');
const path = require('path');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDB;
mongoose
    .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//Init Middleware 
app.use(express.json({ extended: false}));

app.use(express.static(path.join(__dirname, 'client/build')));



// app.get('/', (req, res) => res.send("Welcome sohit kumar shivhare Dash"));

// Use Routes
app.use('/api/pandits', pandits);
app.use('/api/authPandit', authsPandit);
app.use('/api/users', users);
app.use('/api/authUser', authsUser);
app.use('/api/profile', profile);
app.use('/api/appointment', appointment);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

if(process.env.NODE_ENV ==='production') {
    app.use(express.static('client/build'));
}


const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Server running on port ${port}`));