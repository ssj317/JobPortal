import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack } from '@mui/material';

const JobForm = ({ onSubmit, initialData }) => {
  const [job, setJob] = useState({
    title: '',
    company: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
    isActive: true,
  });

  useEffect(() => {
    if (initialData) setJob(initialData);
  }, [initialData]);

  const handleChange = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(job);
    // Reset form only if adding new job
    if (!initialData) {
      setJob({
        title: '',
        company: '',
        department: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        responsibilities: '',
        requirements: '',
        isActive: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Job Title" name="title" value={job.title} onChange={handleChange} fullWidth required />
        <TextField label="Company" name="company" value={job.company} onChange={handleChange} fullWidth required />
        <TextField label="Department" name="department" value={job.department} onChange={handleChange} fullWidth />
        <TextField label="Location" name="location" value={job.location} onChange={handleChange} fullWidth required />
        <TextField label="Job Type" name="type" value={job.type} onChange={handleChange} fullWidth />
        <TextField label="Salary" name="salary" value={job.salary} onChange={handleChange} fullWidth />
        <TextField
          label="Description"
          name="description"
          value={job.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Responsibilities"
          name="responsibilities"
          value={job.responsibilities}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
        />
        <TextField
          label="Requirements"
          name="requirements"
          value={job.requirements}
          onChange={handleChange}
          fullWidth
          multiline
          rows={2}
        />
        <Button type="submit" variant="contained" color="secondary">
          {initialData ? 'Update Job' : 'Add Job'}
        </Button>
      </Stack>
    </form>
  );
};

export default JobForm;
