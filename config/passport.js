const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {User}=require("../model/user");
const {validPassword} = require("../lib/passwordUtils");

const customFields = {
  usernameField: "email",
  passwordField: "password", //this line is not required but putting here for learning purpose
  /*
    if passwordField was for eg passcode (formfield) then we would write
    passwordField: 'passcode'
    */
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username });

    if (!user) {
      return done(null, false);
    }

    const isValid = validPassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
