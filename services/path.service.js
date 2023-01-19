const PathModel = require('../models/path.model');

/**
 * Save a new document.
 *
 * @param {Object} data
 * @returns {Promise}
 */
exports.createPath = (data) => PathModel.create(data);

/**
 * Delete a document.
 *
 * @param {ObjectId} id
 * @returns {Promise}
 */
exports.deletePath = (id) => PathModel.deleteOne({ _id: id });

exports.getPath = (id) => PathModel.findById(id);

exports.findPaths = (query = {}) => PathModel.find(query);

/**
 * Update a path.
 *
 * @param {ObjectId} id
 * @param {Object} data
 * @returns {QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<any, {}, {}>, {}, any>}
 */
exports.updatePath = (id, data) => PathModel.updateOne({ _id: id }, data);
