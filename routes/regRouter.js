const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { sessionChecker } = require("../middleware/auth");

const saltRounds = 10;

router.get("/", (req, res) => {
  res.render("homepage");
});

router
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.render("reg/signup");
  })
  .post(async (req, res, next) => {
    try {
      const { userName, userEmail, userPassword } = req.body;
      const user = new User({
        userName,
        userEmail,
        userPassword: await bcrypt.hash(userPassword, saltRounds),
      });
      await user.save();
      req.session.user = user;
      res.redirect("/index");
      console.log(">>>>>>>>>>>>> signup success");
    } catch {
      res.render("reg/signup", { error: true });
      console.log(">>>>>>>>>>>>> signup failed");
    }
  });

router
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.render("reg/login");
  })
  .post(async (req, res) => {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });
    if (user && (await bcrypt.compareSync(userPassword, user.userPassword))) {
      req.session.user = user;
      res.redirect("/index");
      console.log(">>>>>>>>>>>>> login success");
    } else {
      res.render("reg/login", { error: true });
      console.log(">>>>>>>>>>>>> login failed");
    }
  });

router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/");
      console.log(">>>>>>>>>>>>>logout success");
    } catch (err) {
      next(err);
    }
  } else {
    res.redirect("/auth/login");
    console.log(">>>>>>>>>>>>>logout failed");

  }
});

module.exports = router;
