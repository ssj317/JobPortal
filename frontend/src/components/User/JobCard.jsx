import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const JobCard = ({ job, onApply }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await onApply(job._id, formData);
    setOpen(false);
    setFormData({
      applicantName: "",
      email: "",
      phone: "",
      resumeLink: "",
      coverLetter: "",
    });
  };

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        background: "linear-gradient(to bottom right, #ffffff, #f1f8e9)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        transition: "transform 0.3s",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {job.title}
        </Typography>
        <Typography color="text.secondary">
          📍 {job.location}
        </Typography>

        {/* ✅ Salary Section */}
        {job.salary && (
          <Typography
            variant="body1"
            sx={{ mt: 1, fontWeight: 500, color: "#00796b" }}
          >
            💰 Salary: {job.salary}
          </Typography>
        )}

        <Typography sx={{ mt: 1 }}>{job.description}</Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}
          onClick={() => setOpen(true)}
        >
          Apply
        </Button>
      </CardContent>

      {/* Application Form Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            name="applicantName"
            label="Full Name"
            value={formData.applicantName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="resumeLink"
            label="Resume Link"
            value={formData.resumeLink}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="coverLetter"
            label="Cover Letter"
            value={formData.coverLetter}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default JobCard;
