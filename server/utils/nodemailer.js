const nodemailer = require("nodemailer");

async function sendEmail({ receiver, subject, html }) {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Mern-auth" <accounts@mern-auth.co>', // sender address
    to: "sandbergjacques500@gmail.com, baz@example.com", // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });

  console.log(info);
}

module.exports = { sendEmail };
