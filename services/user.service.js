const UserModel = require('../models/user.model');

/**
 * Save a new user.
 *
 * @param {Object} data
 * @returns {Promise}
 */
exports.createUser = (data) => UserModel.create(data);

/**
 * Delete a user.
 *
 * @param {ObjectId|string} id
 * @returns {QueryWithHelpers}
 */
exports.deleteUser = (id) => UserModel.deleteOne({ _id: id });

/**
 * Get user by id
 *
 * @param {ObjectId|string} id
 * @returns {QueryWithHelpers}
 */
exports.getUser = (id) => UserModel.findById(id);

/**
 * Get user by his email
 *
 * @param {string} email
 * @returns {QueryWithHelpers}
 */
exports.getUserByEmail = (email) => UserModel.findOne({ email });

/**
 * Fetch all users
 *
 * @param {FilterQuery} query
 * @returns {QueryWithHelpers}
 */
exports.findUsers = (query = {}) => UserModel.find(query);

/**
 * Update a user.
 *
 * @param {ObjectId|string} id
 * @param {Object} data
 * @returns {QueryWithHelpers}
 */
exports.updateUser = (id, data) => UserModel.updateOne({ _id: id }, data);
