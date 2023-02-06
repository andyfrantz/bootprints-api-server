const {
  createPath,
  deletePath,
  getPath,
  findPaths,
  updatePath,
} = require('../services/path.service');
const { ApiError } = require('../errors');

/**
 * Handle get all Paths request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.getAllPathsHandler = (req, res) => {
  findPaths()
    .then((documents) => {
      res.status(200).json({
        paths: documents,
      });
    });
};

/**
 * Handle fetch single Path request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
exports.getPathHandler = (req, res, next) => {
  getPath(req.params.id)
    .then((path) => {
      if (path) {
        res.status(200).json(path);
      } else {
        next(new ApiError(404, 'Path not found!'));
      }
    }).catch(() => {
      next(new ApiError(422, 'Bad object id format'));
    });
};

/**
 * Handle create Path request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
exports.createPathHandler = (req, res, next) => {
  const reqBody = req.body;

  createPath({ ...reqBody })
    .then((createdPath) => {
      res.status(201).json({
        message: 'Path created successfully',
        path: createdPath,
      });
    })
    .catch(() => {
      next(new ApiError(500, 'Creating a Path failed!'));
    });
};

/**
 * Handle delete Path request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.deletePathHandler = (req, res) => {
  deletePath(req.params.id).then(() => {
    res.status(200).json({ message: 'Post deleted!' });
  });
};

/**
 * Handle update Path request.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
exports.updatePathHandler = (req, res) => {
  const reqBody = req.body;

  updatePath(req.params.id, { ...reqBody }).then(() => {
    res.status(200).json({ message: 'Path updated!' });
  });
};
