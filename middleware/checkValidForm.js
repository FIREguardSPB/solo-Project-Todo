const dateFormat = require("dateformat");
const User = require("../models/users");
function checkValidForm(req, res, next) {
  console.log(req.body);
  console.log(req.session);
  let {
    start,
    end,
    nameTodo,
    descriptionTodo,
    startClock,
    endClock,
  } = req.body;
  currentDate = new Date();
  Data = new Date();
  Year = Data.getFullYear();
  Month = Data.getMonth();
  Day = Data.getDate();
  let eqDateStart = new Date(start);
  let eqDateEnd = new Date(end);
  if (eqDateStart < currentDate || eqDateEnd < currentDate) {
    res.json({
      message: "Дата не должна быть раньше текущей!!!",
    });
  }
  next();
}

module.exports = { checkValidForm };
