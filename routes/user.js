const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const { isLogin } = require("../middleware/auth");
const User = require("../models/users");
const router = express.Router();
