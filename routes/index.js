const express = require("express");
// const bcrypt = require("bcrypt");
const controller = require('../controllers')
// const { sessionChecker } = require("../middleware/auth");
const {isLogin} = require('../middleware/auth')
const router = require('express').Router()
const User = require("../models/users");
// const Auction = require("../models/auction");
// const { User } = require("../models/users");
// const saltRounds = 10;
///////////////////////////////////////////
router.get('/', isLogin, controller.getMainPage)
router.get('/login', controller.getLoginPage)
router.get('/privateOffice', controller.getPrivateOfficePage)
router.get("/logout", controller.logOut)
// async (req, res, next) => {
//   // если сессия существует, то выполняем код через try catch
//   if (req.session.user) {
//     try {
//       // уничтожает сессию (удаление файла)
//       await req.session.destroy();
//       // чистит куку (удаление в браузере)
//       res.clearCookie("user_sid");
//       // редиректит на корень
//       res.redirect("/");
//     } catch (error) {
//       // улетаем в обработчик ошибок (см. /middleware/error-handlers)
//       next(error);
//     }
//   } else {
//     res.redirect("/login");
//   }
// });



// router.post('/registration', controller.getRegistrationPage)
// router.get('/edit/:id', controller.getEditPage)
 



// // при переходе на "корень", запускается функция sessionChecker
// //если не залогинен, то открывается форма логина
// router.get("/", sessionChecker, (req, res) => {
//   res.redirect("/login");
// });






// // оптимизированный вид написания "ручек"
// //Регистрация
// router
//   .route("/signup")
//   .get(sessionChecker, (req, res) => {
//     res.render("signup");
//   })
//   .post(async (req, res, next) => {
//     try {
//       const { username, email, password } = req.body;
//       const user = new User({
//         userName,
//         name,
//         surname,
//         email,
//         password: await bcrypt.hash(password, saltRounds),
//         age,
//         role,
//         skill,
//       });
//       await user.save();
//       req.session.user = user;
//       res.redirect("/privateOffice");
//     } catch (error) {
//       next(error);
//     }
//   });


// //Правка товара
// //Рендер страницы правки
// router.get("/edit", (req, res) => {
//   const { user } = req.session;
//   if (req.session.user) {
//     const { nameItem, aboutItem, start, end } = req.query;
//     const originNameItem = nameItem;
//     res.render("edit", {
//       nameItem,
//       aboutItem,
//       start,
//       end,
//       name: user.username,
//       originNameItem,
//     });
//   } else {
//     res.redirect("/login");
//   }
// });
// //Внесение изменений
// router.post(
//   "/edit",
//   async (req, res) => {
//     const { user } = req.session;
//     if (req.session.user) {
//       const { nameItem, aboutItem, start, end, originNameItem } = req.body;
//       // res.json({nameItem})
//       await Auction.findOneAndUpdate(
//         { originNameItem },
//         {
//           nameItem,
//           aboutItem,
//           start,
//           end,
//           creater: user.username,
//         }
//       );
//       // await Auction.findOneAndRemove({originNameItem})
//       // // Auction.findById

//       // req.session.user = user;
//       res.redirect("/dashboard");
//     }
//   }
//   // }
// );
// router.get("/delete", async (req, res) => {
//   if (req.session.user) {
//     const { nameItem } = req.query;
//     await Auction.findOneAndRemove({ nameItem });
//     res.redirect("dashboard");
//   }
// });
// //Рендер личного кабинета
// router.get("/dashboard", async (req, res) => {
//   // если сессия есть вытаскиваем user, чтобы его рендерить на странице
//   if (req.session.user) {
//     const { user } = req.session;
//     const findAuction = await Auction.find({ creater: user.username });
//     if (findAuction) {
//       const { nameItem, aboutItem, start, end } = findAuction;
//       res.render("dashboard", {
//         name: user.username,
//         nameItem,
//         start,
//         end,
//         findAuction,
//       });
//     }

//     // res.render("dashboard", { name: user.username });
//   } else {
//     res.redirect("/login");
//   }
// });

// router.get("/logout", async (req, res, next) => {
//   // если сессия существует, то выполняем код через try catch
//   if (req.session.user) {
//     try {
//       // уничтожает сессию (удаление файла)
//       await req.session.destroy();
//       // чистит куку (удаление в браузере)
//       res.clearCookie("user_sid");
//       // редиректит на корень
//       res.redirect("/");
//     } catch (error) {
//       // улетаем в обработчик ошибок (см. /middleware/error-handlers)
//       next(error);
//     }
//   } else {
//     res.redirect("/login");
//   }
// });

module.exports = router;
