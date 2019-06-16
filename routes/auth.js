var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup"
    })
  );
  app.get("/", isLoggedIn, authController.index);
  app.get("/logout", authController.logout);
  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signin?failure=true"
    })
  );

  function isLoggedIn(req, res, next) {
    //console.log("are you logged in?!");
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
