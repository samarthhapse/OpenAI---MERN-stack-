// a simple middleare to handle the error
//  it handles the error which occurs during the processing of the request and passes the control to the next middleware function
const errorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  // spreading errror
  let error = { ...err };
  error.message = err.message;
  // mongoose cast error
  if (err.name === "castError") {
    const message = "resource not found mongoose cast error";
    error = new errorResponse(message, 404);
  }
  // duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value error";
    error = new errorResponse(message, 400);
  }
  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 401);
    res.status(error.statuscode || 500).json({
      success: false,
      error: error.message || "server error",
    });
  }
};
module.exports = errorHandler;
