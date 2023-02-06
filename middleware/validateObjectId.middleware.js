const mongoose = require('mongoose');

/*
 * Validate if the request parameter is given and of correct type.
 */
module.exports = (req, res, next) => {
  if (mongoose.isValidObjectId(req.params.id)) {
    next();
  } else {
    res.status(422).json({
      message: 'The given ID is of wrong type format. Required: 24 hexadecimal character string',
    });
  }
};
