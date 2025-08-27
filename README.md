# Job Portal

A full-stack **Job Portal** application built with **MERN** (MongoDB, Express, React, Node.js) and **Socket.IO** for real-time updates. Users can browse and apply for jobs, and admins can view applications for each job.

---

## Approach

- **Frontend:** Built with React and React Router (using HashRouter) for smooth client-side routing. Axios is used to interact with the backend API, and Socket.IO-client enables real-time notifications.  
- **Backend:** Node.js + Express API handles job listings, applications, and admin operations. Mongoose manages MongoDB Atlas database interactions.  
- **Real-time Updates:** Socket.IO allows the admin to get live updates when new applications are submitted.  
- **Deployment:** Backend and frontend are deployed on Render, and HashRouter ensures correct routing without 404 errors. Environment variables are used for API URLs and database credentials to separate configuration from code.

---

## Features

- User dashboard to view and apply for jobs.  
- Admin dashboard to view applications per job.  
- Real-time notifications for new applications.  
- MongoDB Atlas for data storage.  
- Responsive UI using Material-UI.  

---

## Technologies

- **Frontend:** React, React Router (HashRouter), Axios, Material UI, Socket.IO-client  
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.IO  
- **Database:** MongoDB Atlas  
- **Deployment:** Render  

---

## Setup & Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/ssj317/JobPortal.git
cd JobPortal

## Backend setup
cd backend
npm install

## Backend .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jobPortal


## start server
node index.js

## Frontend Setup
cd ../frontend
npm install

## .env
VITE_API_URL=http://localhost:5000/api

## start server
npm run dev

##Access the Application

User Dashboard: http://localhost:5173/
Admin Dashboard: http://localhost:5173/#/admin

##Deployed URLs

Backend (Render): https://job-portal-backend-irlc.onrender.com/api
Frontend (Render): https://job-portal-frontend-nztd.onrender.com
