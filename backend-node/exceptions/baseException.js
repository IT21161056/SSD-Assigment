class AppBaseError extends Error {
  constructor(message, status, type) {
    super(message);
    this.status = status;
    this.type = type;
  }
}

class CustomError extends AppBaseError {
  constructor(message, status, type) {
    super(message, status, type);
  }
}

module.exports = {
  AppBaseError,
  CustomError,
};
