const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  createUser,
  getUserByEmail
} = require('../services/user.service');
const { ApiError } = require('../errors');
const ConfigService = require('../services/configuration.service');

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

exports.authenticate = (req, res) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(402).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        ConfigService.JWT_KEY,
        { expiresIn: ConfigService.JWT_EXPIRATION_TIME }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
}
