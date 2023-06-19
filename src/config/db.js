const mongoose = require("mongoose");
const { mongodbUrl } = require("../../secret");
const dbConnection = async () => {
  await mongoose.connect(mongodbUrl, { autoIndex: true });
  console.log("database connected successfully".bgGreen);
};

module.exports = dbConnection;
