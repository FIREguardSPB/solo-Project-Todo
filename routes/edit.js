const express = require("express");
// const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/users");
const Auction = require('../models/auction')
// const saltRounds = 10;
const router = express.Router();
const mongoose = require('mongoose');

//Правка
//Рендер страницы правки
router.get('/', (req, res) => {
  const { user } = req.session;
  if (req.session.user){
    
    const {nameItem, aboutItem, start, end} = req.query
res.render('edit', {nameItem, aboutItem, start, end, name: user.username})
  }
else {res.redirect('/login')}
})
//Внесение изменений
router.post('/', async (res, req) => {
  // const { user } = req.session;
  // if (req.session.user){
  
  const {nameItem, aboutItem, start, end } = req.body;
  await res.json({nameItem, aboutItem, start, end})
  // await Auction.updateOne({nameItem},{
  //   nameItem,
  //   aboutItem,
  //   start,
  //   end,
  //   creater: user.username
  
  // }

  // )
  // // Auction.findById

  // req.session.user = user;
  // res.redirect('/dashboard')
  // }
  }
// }
)
