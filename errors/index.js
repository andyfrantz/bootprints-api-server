const codes = require('../constants/httpError.codes.json');

class ApiError extends Error {
  constructor(statusCode = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    if (!params[0]) {
      this.message = codes[this.statusCode];
    }
  }
}

module.exports = {
  ApiError,
};
