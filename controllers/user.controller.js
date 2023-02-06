const jwt = require('jsonwebtoken');

const {
  createUser,
  getUserByEmail,
  getUser,
} = require('../services/user.service');
const { ApiError } = require('../errors');
const ConfigService = require('../services/configuration.service');
const convertToSeconds = require('../utils/convertToSeconds');

/**
 * Handle create User request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
exports.createUserHandler = (req, res, next) => {
  const reqBody = req.body;

  createUser({ ...reqBody })
    .then((createdUser) => {
      // eslint-disable-next-line no-underscore-dangle
      const { password, __v, ...createdUserClean } = createdUser._doc;
      res.status(201).json({
        message: 'User created successfully',
        user: createdUserClean,
      });
    })
    .catch(() => {
      next(new ApiError(500, 'Creating a User failed!'));
    });
};

/**
 * Handle authenticate User request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
exports.authenticateUserHandler = (req, res, next) => {
  const { email, password } = req.body;

  if (!!email && !!password) {
    let fetchedUser;
    getUserByEmail(email)
      .then((user) => {
        if (user) {
          fetchedUser = user;
          return user.verifyPassword(password);
        }
        throw new ApiError(402, 'Auth failed');
      })
      .then((valid) => {
        if (valid) {
          // eslint-disable-next-line no-underscore-dangle
          const userId = fetchedUser._id;
          const token = jwt.sign(
            { email: fetchedUser.email, userId },
            ConfigService.JWT_KEY,
            { expiresIn: ConfigService.JWT_EXPIRATION_TIME },
          );
          return res.status(200).json({
            token,
            expiresIn: convertToSeconds(ConfigService.JWT_EXPIRATION_TIME),
            userId,
          });
        }
        throw new ApiError(402, 'Auth failed');
      })
      .catch((err) => {
        let e = err;
        if (!(err instanceof ApiError)) {
          e = new ApiError(402, 'Auth failed');
        }
        next(e);
      });
  } else {
    next(new ApiError(400));
  }
};

/**
 * Handle fetch single User request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
exports.getUserHandler = (req, res, next) => {
  getUser(req.params.id)
    .then((path) => {
      if (path) {
        res.status(200).json(path);
      } else {
        next(new ApiError(404, 'User not found!'));
      }
    }).catch(() => {
      next(new ApiError(422, 'Bad object id format'));
    });
};
