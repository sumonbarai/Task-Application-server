const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "task is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["new", "incomplete", "complete"],
        message: "{VALUE} is not supported",
      },
      default: "new",
    },
  },
  { versionKey: false, timestamps: true }
);

const TaskModel = model("Task", taskSchema);

module.exports = TaskModel;
