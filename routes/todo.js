const express = require("express");
const bcrypt = require("bcrypt");
// const { sessionChecker } = require("../middleware/auth");
// const {isLogin} = require("../middleware/auth");
// const {checkValidForm} = require('../middleware/checkValidForm')
const User = require("../models/users");
const Todo = require("../models/todo");
const router = express.Router();
const controller = require('../controllers/todo')
//Render main TODO page
router.get('/', controller.renderAddTodoPage)
router.post('/', controller.addTodo)
router.delete('/', controller.deleteTodo)
module.exports = router;
