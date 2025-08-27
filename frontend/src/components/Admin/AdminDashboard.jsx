import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import JobForm from './JobForm';
import JobList from './JobList';
import { getJobs, addJob, updateJob } from '../../api/jobApi';
import { socket } from '../../utils/socket';

const AdminDashboard = () => {
  const [editingJob, setEditingJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();

    socket.on('jobAdded', fetchJobs);
    socket.on('jobUpdated', fetchJobs);
    socket.on('jobDeleted', fetchJobs);

    return () => socket.off();
  }, []);

  const handleAddOrUpdateJob = async (job) => {
    if (editingJob) {
      await updateJob(editingJob._id, job);
      setEditingJob(null);
    } else {
      await addJob(job);
    }
    fetchJobs();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          color="#00796b"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          }}
        >
          Admin Dashboard
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(to bottom right, #e0f7fa, #fce4ec)',
                color: '#004d40',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {editingJob ? 'Edit Job' : 'Post a New Job'}
              </Typography>
              <JobForm onSubmit={handleAddOrUpdateJob} initialData={editingJob} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(to bottom right, #ffffff, #f9fbe7)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              }}
            >
              <JobList jobs={jobs} setEditingJob={setEditingJob} fetchJobs={fetchJobs} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
