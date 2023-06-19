const UserModel = require("../models/UserModel");
const errorHandle = require("../utilities/errorHandle");
const jwtTokenCreate = require("../utilities/jwtTokenCreate");
const bcrypt = require("bcrypt");
const { errorResponse, successResponse } = require("./responseHandler");

const create = async (req, res) => {
  try {
    const userData = req.body;
    const result = await UserModel.create(userData);
    const { _id, email } = result || {};
    const token = jwtTokenCreate({ _id, email });
    res.status(201).json({
      status: "success",
      result,
      token,
    });
  } catch (error) {
    errorHandle(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const filter = { email };

    const result = await UserModel.find(filter);
    if (result.length === 1) {
      bcrypt.compare(password, result[0].password, function (err, validation) {
        // if password does not match
        if (!validation) {
          return res.status(200).json({
            status: "fail",
            message: "user and password does not match",
          });
        }
        // if password is match then create token and submit the user
        const { _id, email } = result[0];
        const token = jwtTokenCreate({ _id: _id.toString(), email });

        return res.status(200).json({
          status: "success",
          result: result[0],
          token,
        });
      });
    } else {
      res.status(200).json({
        status: "fail",
        message: "user not found",
      });
    }
  } catch (error) {
    errorHandle(error, res);
  }
};

const profileDetails = async (req, res) => {
  try {
    const email = req.headers.email;
    const result = await UserModel.findOne({ email }, { password: 0 });

    if (!result) {
      return res.status(200).json({
        status: "success",
        message: "user not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    errorHandle(error, res);
  }
};
const profileUpdate = async (req, res) => {
  try {
    const LoggedInEmail = req.headers.email;
    const { email, _id } = req.body;

    // protect email and _id change/update option
    if (email || _id) {
      return errorResponse(res, {
        statusCode: 200,
        message: "you can't change your email address and _id",
      });
    }

    const filter = { email: LoggedInEmail };
    const updateDoc = req.body;
    const options = { runValidators: true, new: true, select: "-password" };

    const result = await UserModel.findOneAndUpdate(filter, updateDoc, options);

    if (!result) {
      return errorResponse(res, { statusCode: 200, message: "user not found" });
    }
    // every think is ok now final response
    return successResponse(res, {
      message: "user profile update successfully",
      payload: result,
    });
  } catch (error) {
    errorHandle(error, res);
  }
};

module.exports = { create, login, profileDetails, profileUpdate };
