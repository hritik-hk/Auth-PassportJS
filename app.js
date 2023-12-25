const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const crypto = require('crypto');
const connection = require('./config/database');



// Package documentation - https://www.npmjs.com/package/connect-mongo
// const MongoStore = require('connect-mongo')(session);

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */



// Create the Express application
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));


/**
 * -------------- SESSION SETUP ----------------
 */

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// app.use(passport.initialize());
// app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/public/home.html`);
});


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(process.env.PORT,()=>console.log(`server listening on port ${process.env.PORT}`));