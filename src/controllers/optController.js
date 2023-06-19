const OTPModel = require("../models/OTPModel");
const SendEmail = require("../utilities/sendEmail");
const { errorResponse, successResponse } = require("./responseHandler");

const sendOTP = async (req, res) => {
  try {
    const email = req.params.email;
    const optCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // opt save in data
    const data = { email: email, otp: optCode };
    await OTPModel.create(data);

    // send email via SMTP server
    await SendEmail(email, `otp code is = ${optCode}`, "Task manager");

    return successResponse(res, {
      message: "opt code send your mail, please checkout",
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
const VerifyOTP = async (req, res) => {
  try {
    const email = req.params.email;
    const code = req.params.code;

    // opt code check in database
    const filter = { email: email, otp: code, status: 0 };
    const updatedData = { status: 1 };
    const options = { runValidators: true };

    const result = await OTPModel.find(filter).count("total");
    if (result === 1) {
      await OTPModel.findOneAndUpdate(filter, updatedData, options);

      return successResponse(res, {
        message: "opt verify successfully",
      });
    } else {
      return errorResponse(res, {
        statusCode: 404,
        message: "verification code already used",
      });
    }
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

module.exports = { sendOTP, VerifyOTP };
