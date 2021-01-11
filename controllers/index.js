const Todo = require("../models/todo");
const User = require("../models/users");
const dateFormat = require("dateformat");
const moment = require("moment");
// const momentR = moment.normalizeUnits
// при переходе на "корень", запускается функция sessionChecker
//если не залогинен, то открывается форма логина
module.exports.getMainPage = function (req, res) {
  res.redirect("/login");
 
};

//по заходу на  /login рендер входа
module.exports.getLoginPage = function (req, res) {
  res.render("login");
};

//Отображение личного кабинета
module.exports.getPrivateOfficePage = async function (req, res) {
  //  если сессия есть вытаскиваем user, чтобы его рендерить на странице
  if (req.session.user) {
    const { user } = req.session;
    const findUser = await User.find({ userName: user.userName });
    let findTodo = await Todo.find({ userNameCreater: user.userName });

    console.log("fintodo", findTodo);
    let { name, surname, email, age, role, skill } = user;
    if (findUser) {
      //подсчет дней до конца задачи на момент вывода
      let { end } = findTodo;
      Data = new Date();
      Year = Data.getFullYear();
      Month = Data.getMonth();
      Day = Data.getDate();
      let estimateDate = new Date(end);
      for (let key of findTodo) {
        key.estimateDate = Math.round((new Date(key.end) - Data) / 864e5);
      }
      res.render("privateOffice", {
        userName: user.name,
        name,
        surname,
        email,
        age,
        role,
        skill,
        findTodo,
      });
    }
  }
};

//LOGOUT
module.exports.logOut = async function (req, res, next) {
  // если сессия существует, то выполняем код через try catch
  if (req.session.user) {
    try {
      // уничтожает сессию (удаление файла)
      await req.session.destroy();
      // чистит куку (удаление в браузере)
      res.clearCookie("user_sid");
      // редиректит на корень
      res.redirect("/");
    } catch (error) {
      // улетаем в обработчик ошибок (см. /middleware/error-handlers)
      next(error);
    }
  } else {
    res.redirect("/login");
  }
};
