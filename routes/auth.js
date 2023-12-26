const router = require("express").Router();
const passport = require("passport");
const { genPassword } = require("../lib/passwordUtils");
const { User } = require("../model/user");
const path = require("path");
const { isAuth } = require("../middleware/authMiddleware");

/**
 * -------------- POST ROUTES ----------------
 */

// TODO
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login-failure",
    successRedirect: "/auth/login-success",
  })
);

// TODO
router.post("/register", async (req, res) => {
  try {
    const { salt, hash } = genPassword(req.body.password);
    const newUser = new User({
      email: req.body.email,
      hash: hash,
      salt: salt,
    });

    await newUser.save();
    res.status(200).redirect("/auth/login");
  } catch (error) {
    res.status(400).json(error);
  }
});

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", (req, res, next) => {
  res.sendFile(`../${__dirname}/public/index.html`);
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get("/register", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
router.get("/protected-route", isAuth, (req, res) => {
  res.send(
    '<h1>You are authenticated</h1><p><a href="/auth/logout">Logout and reload</a></p>'
  );
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/auth/protected-route");
  });
});

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/auth/protected-route">Go to protected route</a></p>'
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong credentials");
});

exports.router = router;
