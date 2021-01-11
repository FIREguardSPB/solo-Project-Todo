const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  // userName: {type: String, unique: true, required: true },
  name: { type: String, unique: false, required: true },
  // surname: {type: String, unique: false, required: true },
  email: { type: String, unique: false, required: false },
  password: { type: String, required: true },


});

module.exports = mongoose.model("User", userSchema);
