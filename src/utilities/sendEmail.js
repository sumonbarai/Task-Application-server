const nodemailer = require("nodemailer");
const { SMTP_USER_NAME, SMTP_PASSWORD } = require("../../secret");

const SendEmail = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_USER_NAME,
      pass: SMTP_PASSWORD,
    },
  });

  let mailOption = {
    from: "Task Manager application <sumonbarai78@gmail.com>",
    to: EmailTo,
    subject: EmailSubject,
    html: `<h1>${EmailText}</h1>`,
  };

  return await transporter.sendMail(mailOption);
};
module.exports = SendEmail;
