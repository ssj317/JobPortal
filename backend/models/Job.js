const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String },
  type: { type: String }, // Fulltime,intern
  department: { type: String },
  description: { type: String },
  responsibilities: { type: String },
  requirements: { type: String },
  salary: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
