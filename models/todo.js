const mongoose = require('mongoose');
// const User = require('../models/users')
const todoSchema = mongoose.Schema({
  userNameCreater: { type: String, required: true },
  // userNameExecutor: {type: Schema.Types.ObjectId, ref: 'User', required: false},
  nameTodo: { type: String, required: true },
  descriptionTodo: { type: String, required: false },
  start: { type: String, required: true },
  startClock: {type: String, required: true},
  end: { type: String, required: true },
  endClock: {type: String, required: true},

  // flag: { type: String, required: true },
  status: {type: String, required: true},
 });

module.exports = mongoose.model('Todo', todoSchema);


// https://oauth.vk.com/blank.html#access_token=30e0910df3d6e5d39ee60964cd447c425589c7178a6fa2e74ced1758f0c8c05760b2cb0d790913720469a&expires_in=86400&user_id=609971
