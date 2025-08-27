import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Stack, Chip } from '@mui/material';
import { deleteJob } from '../../api/jobApi';

const JobList = ({ jobs, setEditingJob, fetchJobs }) => {
  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob(jobId);
      fetchJobs(); // refresh after delete
    }
  };

  return (
    <Stack spacing={3}>
      {jobs.length === 0 ? (
        <Typography color="white">No jobs available</Typography>
      ) : (
        jobs.map((job) => (
          <Card
            key={job._id}
            sx={{
              borderRadius: 4,
              boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              color: 'white',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 35px rgba(0,0,0,0.35)',
              },
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{job.title}</Typography>
                <Chip label={job.isActive ? 'Active' : 'Inactive'} color={job.isActive ? 'success' : 'default'} />
              </Stack>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Company / Dept: {job.department}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Location: {job.location}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Type: {job.type}
              </Typography>
              {job.salary && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Salary: {job.salary}
                </Typography>
              )}
              {job.description && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Description: {job.description}
                </Typography>
              )}
              {job.responsibilities && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Responsibilities: {job.responsibilities}
                </Typography>
              )}
              {job.requirements && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Requirements: {job.requirements}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="success"
                onClick={() => setEditingJob(job)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Stack>
  );
};

export default JobList;
