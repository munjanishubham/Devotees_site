const express = require("express");
const mongoose = require("mongoose");
const pandits = require('./routes/api/pandits');
const authsPandit = require('./routes/api/authPandit');
const users = require('./routes/api/users');
const authsUser = require('./routes/api/authUser');
const profile = require('./routes/api/profile');
const appointment = require('./routes/api/appointment');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDB;
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//Init Middleware 
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send("Welcome munjani"));

// Use Routes
app.use('/api/pandits', pandits);
app.use('/api/authPandit', authsPandit);
app.use('/api/users', users);
app.use('/api/authUser', authsUser);
app.use('/api/profile', profile);
app.use('/api/appointment', appointment);



const port = process.env.PORT || 5000;
app.listen(port , () => console.log(`Server running on port ${port}`));