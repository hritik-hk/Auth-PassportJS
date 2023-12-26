exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .send(
        '<h1>You are not authenticated</h1><p><a href="/auth/login">Login</a></p>'
      );
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === "admin") {
      next();
    } else {
      res
        .status(401)
        .send(
          '<h1>You do not have admin access</h1><h3>Login with admin credentials: <a href="/auth/logout">logout</a></h3>'
        );
    }
  } else {
    res
      .status(401)
      .send(
        '<h1>You are not authenticated</h1><p><a href="/auth/login">Login</a></p>'
      );
  }
};
