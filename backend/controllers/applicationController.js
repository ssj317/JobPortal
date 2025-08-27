const Application = require("../models/application");
const Job = require("../models/Job");

// Apply to a job
exports.applyToJob = async (req, res) => {
  try {
    // If using route param: /apply/:jobId
    const { jobId } = req.params;

    // If frontend sends jobId in body, fallback:
    const jobIdFromBody = req.body.jobId || jobId;

    if (!jobIdFromBody) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const { email } = req.body;

    // Check if job exists
    const job = await Job.findById(jobIdFromBody);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicate applications
    const existingApp = await Application.findOne({ job: jobIdFromBody, email });
    if (existingApp) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Create application
    const application = await Application.create({
      job: jobIdFromBody,
      applicantName: req.body.applicantName,
      email: req.body.email,
      phone: req.body.phone,
      resumeLink: req.body.resumeLink,
      coverLetter: req.body.coverLetter,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    console.error("ApplyToJob Error:", err);
    res.status(500).json({ message: "Server error while applying to job" });
  }
};

// Get all applications for a specific job admin side
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const apps = await Application.find({ job: jobId })
      .populate("job", "title location type") //  only fields that exist
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (err) {
    console.error("GetApplications Error:", err);
    res.status(500).json({ message: "Server error while fetching applications" });
  }
};
