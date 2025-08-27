const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },

    applicantName: { type: String, required: true },

    email: { 
      type: String, 
      required: true, 
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] 
    },

    phone: { 
      type: String, 
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] 
    },

    resumeLink: { 
      type: String, 
      match: [/^https?:\/\/.+/, 'Please enter a valid URL'] 
    },

    coverLetter: { type: String },

    status: { 
      type: String, 
      enum: ['applied', 'reviewing', 'rejected', 'accepted'], 
      default: 'applied' 
    }
  },
  { timestamps: true }
);

// Prevent duplicate applications same mail for same job
ApplicationSchema.index({ job: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
