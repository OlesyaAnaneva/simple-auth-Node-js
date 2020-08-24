// функция-мидлвеар, которая проверяет, если кукис пользователя все еще сохранены в браузере
function cookiesCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}

// функция-мидлвеар, которая проверяет, есть ли в сессии зарегистрированный пользователь
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/index");
  } else {
    next();
  }
};

module.exports = {
  sessionChecker,
  cookiesCleaner,
};
