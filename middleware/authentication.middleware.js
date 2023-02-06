const jwt = require('jsonwebtoken');

const { ApiError } = require('../errors');
const ConfigService = require('../services/configuration.service');

/**
 * Check if request has a valid token in the authorization header.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new ApiError(403));
  } else if (!req.headers.authorization.startsWith('Bearer ')) {
    next(new ApiError(422, 'Authorization Token is not Bearer'));
  } else {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, ConfigService.JWT_KEY);
      req.userData = { email: decodedToken.email, userId: decodedToken.userId };
      next();
    } catch (error) {
      next(new ApiError(401));
    }
  }
};
