require("dotenv").config(); // Load environment variables

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./src/config/db");
const sensorDataRoutes = require("./src/routes/sensorDataRoute");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io with CORS options
const io = socketIo(server, {
  cors: {
    // Allow the client origin, either from your .env or hardcoded for testing
    origin: "*",
    methods: ["GET", "POST"],
    // If needed, you can allow credentials:
    // credentials: true,
  },
});

// Custom middleware to attach Socket.io instance to each request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use("/api", sensorDataRoutes);


// Global Error Handler
app.use(errorHandler);

// Connect to MongoDB and then start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 3999;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
