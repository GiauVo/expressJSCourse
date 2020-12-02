require("dotenv").config();

var nodemailer = require("nodemailer");

module.exports.sendWarnigMail = function() {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: "vongocgiaudemo@gmail.com",
    to: "vongocgiaudemo@gmail.com",
    subject: "[Testing] send mail with nodemailer module",
    text:
      "This is test mail from Express app. You have login with wrong password over 3 times!"
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent:" + info.response + "msg _ sent");
    }
  });
};
