import React, { useEffect, useState } from 'react';
import { getJobs } from '../../api/jobApi';
import { applyJob } from '../../api/applicationApi';
import { socket } from '../../utils/socket';
import { Container, Typography, Stack, Box } from '@mui/material';
import JobCard from './JobCard';

const UserDashboard = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => setJobs(await getJobs());

  useEffect(() => {
    fetchJobs();
    socket.on('jobAdded', fetchJobs);
    socket.on('jobUpdated', fetchJobs);
    socket.on('jobDeleted', fetchJobs);
    return () => socket.off();
  }, []);

  const handleApply = async (jobId, applicationData) => {
    await applyJob({ jobId, ...applicationData });
    alert('Application submitted successfully!');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
        py: 6,
      }}
    >
      <Container maxWidth="md">
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
          User Dashboard
        </Typography>

        {jobs.length === 0 ? (
          <Box
            sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: 'white',
              borderRadius: 4,
              boxShadow: '0 6px 25px rgba(0,0,0,0.1)',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No jobs available
            </Typography>
            <Typography color="text.secondary">Check back later!</Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {jobs.map((job) => (
              <Box
                key={job._id}
                sx={{
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 14px 40px rgba(0,0,0,0.25)',
                  },
                }}
              >
                <JobCard job={job} onApply={handleApply} />
              </Box>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default UserDashboard;
