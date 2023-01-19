const mongoose = require('mongoose');

const { Schema } = mongoose;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const pathSchema = new Schema({
  name: String,
  locationName: String,
  region: String,
  type: String,
  distance: Number,
  level: String,
  duration: Number,
  location: {
    type: pointSchema,
    required: true,
    index: '2dsphere', // Create a special 2dsphere index on `City.location`
  },
});

module.exports = mongoose.model('Path', pathSchema);
