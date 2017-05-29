const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
  name: String,
  email: String,
  weight: Number,

}, { timestamps: true });

const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;
