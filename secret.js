require("dotenv").config();

const mongodbUrl = process.env.MONGODB_URL;
const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const SMTP_USER_NAME = process.env.SMTP_USER_NAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

module.exports = {
  mongodbUrl,
  PORT,
  JWT_SECRET_KEY,
  SMTP_USER_NAME,
  SMTP_PASSWORD,
};
