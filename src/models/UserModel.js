const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName is required"],
      lowercase: true,
      trim: true,
      minLength: [2, "user Name must be 2 character"],
      maxLength: [15, "user Name must be 2 character"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
      unique: true,
      immutable: true,
    },
    mobile: {
      type: String,
      required: [true, "mobile number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?(88)?0?1[3456789][0-9]{8}\b/.test(v);
        },
        message: (props) => `${props.value} is not a valid bangladeshi number`,
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minLength: [8, "password must be 2 character"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = model("Users", userSchema);

module.exports = UserModel;
