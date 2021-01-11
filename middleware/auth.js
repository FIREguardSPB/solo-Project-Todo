// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
function cookiesCleaner(req, res, next) {
  // если есть кука и нет сессии - удаляем куку
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}

// middleware function to check for logged-in users - функция проверки залогиненного юзера
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};
const isLogin = (req, res, next) => {
  if (!req.session.user){
    res.redirect('/login')
  } else {
    next()
  }
}

module.exports = {
  sessionChecker,
  cookiesCleaner,
  isLogin
};
