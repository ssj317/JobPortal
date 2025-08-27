const express = require('express');
const jobController = require('../controllers/jobController');

module.exports = (io) => {
  const router = express.Router();

  router.get('/', jobController.getJobs);
  router.get('/:id', jobController.getJobById);
  router.post('/', jobController.createJob);
  router.put('/:id', jobController.updateJob);
  router.delete('/:id', jobController.deleteJob);

  return router;
};
