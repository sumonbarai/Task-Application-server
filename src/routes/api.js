const express = require("express");
const userController = require("../controllers/userController");
const optController = require("../controllers/optController");
const TaskController = require("../controllers/TaskController");
const authVerifyMiddleware = require("../middlewares/authVerifyMiddleware");
const router = express.Router();

// status
router.get("/status", (req, res) => {
  res.status(200).send("server is running");
});

// user route
router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/profileDetails", authVerifyMiddleware, userController.profileDetails);
router.patch("/profileUpdate", authVerifyMiddleware, userController.profileUpdate);

// opt route
router.post("/sendOTP/:email", optController.sendOTP);
router.get("/VerifyOTP/:email/:code", optController.VerifyOTP);

// task route
router.post("/createTask", authVerifyMiddleware, TaskController.createTask);
router.get("/getTask/:id", authVerifyMiddleware, TaskController.getTask);
router.get("/getTasks", authVerifyMiddleware, TaskController.getTasks);
router.patch("/updateTask/:id", authVerifyMiddleware, TaskController.updateTask);
router.delete("/deleteTask/:id", authVerifyMiddleware, TaskController.deleteTask);

module.exports = router;
