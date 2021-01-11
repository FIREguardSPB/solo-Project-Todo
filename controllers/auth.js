
const User = require('../models/users')
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Регистрация нового пользователя
//Отображение формы
module.exports.getSignupPage = function(req, res){
  res.render('signup')
}
//Создание нового пользователя

module.exports.createUser = async function(req, res, next){
      try {
        const { username, name, surname, email, password, age, role, skill } = req.body;
        const user = new User({
          userName: username,
          name,
          surname,
          email,
          password: await bcrypt.hash(password, saltRounds),
          age,
          role,
          skill,
        });
        await user.save();
        req.session.user = user;
        res.redirect("/privateOffice");
      } catch (error) {
        next(error);
      }
    }

//Непосредственно вход
module.exports.postLogin = async function(req, res){
  const { username, password } = req.body;
  const user = await User.findOne({ userName: username });
  // bcrypt - шифровальщик паролей, сравнивает пароль из POST запроса и пароль из БД
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect("/privateOffice");
  } else {
    res.redirect("/login");
  }
}

