const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const {User} = require('../model/user');

// TODO: passport.use();