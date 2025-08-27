require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const jobRoutesFactory = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// ✅ Connect to MongoDB Atlas
connectDB();

// ✅ Socket.IO setup
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// attach io to every request (if routes need to emit events)
app.use((req, res, next) => {
  req.io = io;
  next();
});

//  Routes
app.use("/api/jobs", jobRoutesFactory(io));
app.use("/api/applications", applicationRoutes);

// checking route for testing DB andserver status
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", mongo: "connected" });
});

// Socket IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
