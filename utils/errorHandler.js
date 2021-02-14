class ErrorCreator extends Error {
  constructor(status, message) {
    super();
    this.status = status || 500;
    this.message = message || "Something went wrong";
  }
}
const handleValidation = (err, res, msg) => {
  if (!msg) msg = err.message;
  res.status(400).json({
    status: "Error",
    message: msg,
  });
};

const errorHandler = (err, res) => {
  //Check if error was produced in validation of DB
  if (err.name == "ValidationError") handleValidation(err, res);
  if (err.code == 11000 && err.keyPattern.email)
    handleValidation(err, res, (msg = "Email already registered"));
  // Default herror handling
  else {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).json({
      status: err.message || "Invalid",
    });
  }
};

module.exports = { ErrorCreator, errorHandler };
