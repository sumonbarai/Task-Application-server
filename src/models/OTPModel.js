const { mongoose, model } = require("mongoose");

const OTPSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    otp: String,
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

const OTPModel = model("Otp", OTPSchema);
module.exports = OTPModel;
