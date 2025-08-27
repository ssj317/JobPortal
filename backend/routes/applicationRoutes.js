const express = require('express');
const { applyToJob, getApplicationsForJob } = require('../controllers/applicationController');

const router = express.Router();

router.post('/:jobId/apply', applyToJob);
router.get('/:jobId/applications', getApplicationsForJob);

module.exports = router;
