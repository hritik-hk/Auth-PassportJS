const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const connection = require("./database");
const { User } = require("../model/user");

const options= {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback",
  }

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy( options, async function (accessToken, refreshToken, profile, cb) {

        try {
            const user = await User.findone({_id: jwt_payload.sub},"_id email role");
        
            if (!user) {
              return cb(null, false); //return null in error and false as user doesnt exist
            }
            else{
                req.user = user // Assign the user object to req.user
                return cb(null, user);
            }
        
          } catch (err) {
                return cb(err,false);
          }


        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
