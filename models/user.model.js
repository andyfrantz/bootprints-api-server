const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcryptPlugin = require('mongoose-bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, bcrypt: true },
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(bcryptPlugin);

module.exports = mongoose.model('User', userSchema);
