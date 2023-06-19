const TaskModel = require("../models/TaskModel");
const { successResponse, errorResponse } = require("./responseHandler");

const createTask = async (req, res) => {
  try {
    const loggedEmail = req.headers.email;
    const userData = req.body;
    const taskData = {
      email: loggedEmail,
      ...userData,
    };
    const result = await TaskModel.create(taskData);

    // every think is ok and now success response to client
    return successResponse(res, {
      statusCode: 201,
      message: "Task create successfully",
      payload: result,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
const getTask = async (req, res) => {
  try {
    const loggedEmail = req.headers.email;
    const id = req.params.id;
    const filter = { email: loggedEmail, _id: id };
    const result = await TaskModel.findOne(filter);

    // every think is ok and now success response to client
    return successResponse(res, {
      message: "successfully get single Task",
      payload: result,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
const getTasks = async (req, res) => {
  try {
    const loggedEmail = req.headers.email;
    const search = req.query.search || "";
    const status = req.query.status;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const searchRegExp = new RegExp(".*" + search + ".*");

    const filter = {
      email: loggedEmail,
      $or: [{ title: { $regex: searchRegExp } }],
    };

    //  filter by status
    if (status) {
      filter.status = status;
    }

    const result = await TaskModel.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);

    // count total task
    const count = await TaskModel.find(filter).countDocuments();

    // if no task found
    if (count === 0) {
      return errorResponse(res, { message: "no Task found" });
    }

    // every think is ok and now success response to client
    return successResponse(res, {
      message: "successfully get Task",
      payload: {
        result: result,
        pagination: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const loggedEmail = req.headers.email;
    const id = req.params.id;
    const { email, _id } = req.body;

    // protect email and _id change/update option
    if (email || _id) {
      return errorResponse(res, {
        statusCode: 200,
        message: "you can't change your email address and _id",
      });
    }

    const filter = { email: loggedEmail, _id: id };
    const updateDoc = req.body;
    const options = {
      runValidators: true,
      new: true,
      select: "-createdAt -updatedAt",
    };

    const result = await TaskModel.findOneAndUpdate(filter, updateDoc, options);

    if (!result) {
      return errorResponse(res, {
        statusCode: 400,
        message: "update operation failed",
      });
    }

    // every think is ok now final response
    return successResponse(res, {
      message: "user profile update successfully",
      payload: result,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await TaskModel.findByIdAndDelete(id);

    if (!result) {
      return errorResponse(res, {
        statusCode: 400,
        message: "delete operation failed",
      });
    }

    // every think is ok now final response
    return successResponse(res, {
      message: "Task delete successfully",
      payload: result,
    });
  } catch (error) {
    return errorResponse(res, { message: error.message });
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };
