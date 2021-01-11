const Todo = require("../models/todo");
const User = require("../models/users");
const main = require("../middleware/sendMail")
//рендер формы добавления задачи
module.exports.renderAddTodoPage = async function (req, res) {
  const { user } = req.session;
  if (req.session.user) {
    // const findAuction = await Auction.find({ creater: user.username });

    // if (findAuction) {
    //   const {nameItem, aboutItem, start, end} = findAuction
    // const { user } = req.session;
    res.render("addTodo", { username: user.userName });
  } else res.render("login");
};

//добавление задачи с последующим рендером личного кабинета
module.exports.addTodo = async function (req, res) {
  const { user } = req.session;
  const { nameTodo, descriptionTodo, start, end, status, startClock, endClock } = req.body;
  //Проверка валидности формы
  let currentDate = new Date();
  Data = new Date();
Year = Data.getFullYear();
Month = Data.getMonth();
Day = Data.getDate();
let eqDateStart = new Date(start);
let eqDateEnd = new Date(end);
if (eqDateStart < currentDate || eqDateEnd < currentDate || eqDateEnd < eqDateStart) {
  res.send()
} else {

  console.log(user);
  
  const addTodo = new Todo({
    nameTodo,
    descriptionTodo,
    status,
    start,
    startClock,
      end,
      endClock,
    userNameCreater: user.userName,
  });
  await addTodo.save();
  
  req.session.user = user;
  res.redirect("/privateOffice");
}};



//Удаление задачи
module.exports.deleteTodo = async function (req, res) {
  const { nameTodo } = req.query;
  await Todo.findOneAndRemove(nameTodo);
  res.redirect("/privateOffice");
};

// findOneAndRemove;
