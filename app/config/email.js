 
const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
  const mail = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "faff7b7322d019",
      pass: "e541ae3df44f37"
    }
})

// send mail with defined transport object
  let  mailOptions = {
  from: '"Green Code  Team " <admin@greencode.com>', // sender address
  to: "nitish3rde@gmail.com", // list of receivers
  subject: "Green Code  Team  ", // Subject line
  text: "please use this otp to complete resgistration ", // plain text body
};

module.exports = {
    mail,
    mailOptions
}
