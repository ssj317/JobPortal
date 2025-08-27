import axios from "axios";


const API_BASE = import.meta.env.VITE_API_URL;

export const applyJob = async ({ jobId, ...applicationData }) => {
  try {
    const res = await axios.post(
      `${API_BASE}/applications/${jobId}/apply`,
      applicationData
    );
    return res.data;
  } catch (err) {
    console.error("applyJob API error:", err);
    throw err.response?.data || err;
  }
};
