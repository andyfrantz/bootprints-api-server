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
 * @param {ObjectId|string} id
 * @returns {QueryWithHelpers}
 */
exports.deletePath = (id) => PathModel.deleteOne({ _id: id });

/**
 * Find a path by his id.
 *
 * @param {ObjectId|string} id
 * @returns {QueryWithHelpers}
 */
exports.getPath = (id) => PathModel.findById(id);

/**
 * Find a path by a give query object.
 *
 * @param {FilterQuery} query
 * @returns {QueryWithHelpers}
 */
exports.findPaths = (query = {}) => PathModel.find(query);

/**
 * Update a path.
 *
 * @param {ObjectId|string} id
 * @param {Object} data
 * @returns {QueryWithHelpers}
 */
exports.updatePath = (id, data) => PathModel.updateOne({ _id: id }, data);
