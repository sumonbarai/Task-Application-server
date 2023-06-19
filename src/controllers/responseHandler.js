const errorResponse = (
  res,
  { statusCode = 500, message = "internal server Error" }
) => {
  return res.status(statusCode).json({
    status: "fail",
    message: message,
  });
};
const successResponse = (
  res,
  { statusCode = 200, message = "success", payload = {} }
) => {
  return res.status(statusCode).json({
    status: "success",
    message: message,
    payload: payload,
  });
};

module.exports = { errorResponse, successResponse };
