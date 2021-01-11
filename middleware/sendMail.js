const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(textMail){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ngs.ru",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "stells", // generated ethereal user
      pass: "Ant_260671520032" // generated ethereal password
    }
  });
let mailReceiver = "antonluba@rambler.ru"
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "stells@ngs.ru", // sender address
    to: mailReceiver, // list of receivers
    subject: "Напоминание!", // Subject line
    text: "Здравствуйте, нароминаем Вам о завершении Вашей активной задачи через 30 минут.", // plain text body
    //html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);

}
module.exports = main
