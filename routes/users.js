const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const {isAuth}=require("../middleware/auth");
const utils = require("../lib/utils");
const path = require("path");
const passport = require('passport');

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", (req, res, next) => {
    res.sendFile(`../${__dirname}/public/index.html`);
  });

  router.get("/login", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../public", "login.html"));
  });

  router.get("/register", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../public", "register.html"));
  });
  

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        msg: "You are successfully authenticated to this route!",
      });
  }
);

// Validate an existing user and issue a JWT
router.post("/login", async function (req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ success: false, msg: "invalid credentials-u" });
    }
    
    const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
    
    if (isValid) {

        const tokenObject = utils.issueJWT(user); //issue token/jwt

        res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

    } else {

        res.status(401).json({ success: false, msg: "invalid credentials-p" });

    }
  } catch (err) {
    next(err);
  }
});

// Register a new user
router.post("/register", async function (req, res) {
  try {
    const { hash, salt } = utils.genPassword(req.body.password);

    const newUser = new User({
      email: req.body.email,
      hash: hash,
      salt: salt,
    });

    const user = await newUser.save();
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
});

module.exports = router;
