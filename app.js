require("dotenv").config(); // Load environment variables

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./src/config/db");
const sensorDataRoutes = require("./src/routes/sensorDataRoutes");
const deviceRoutes = require("./src/routes/deviceRoutes");
const errorHandler = require("./src/middlewares/errorHandler");
const deviceService = require("./src/services/deviceService");

const app = express();

// Middlewares
app.use(cors({ origin: "*" })); // Allow all origins
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

setInterval(async () => {
  try {
    const result = await deviceService.checkOfflineDevices();
    if (result.modifiedCount > 0) {
      io.emit("offline-devices");
      console.log(`${result.modifiedCount} devices marked as offline`);
    }
  } catch (error) {
    console.error("Error checking offline devices:", error);
  }
}, 30000);

// Custom middleware to attach Socket.io instance to each request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use("/api", sensorDataRoutes);
app.use("/api", deviceRoutes);
// Global Error Handler
app.use(errorHandler);

// Connect to MongoDB and then start the server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3999;
    server.listen(PORT, "0.0.0.0", () => {
      // Add '0.0.0.0' to listen on all network interfaces
      console.log(`Server is running on port ${PORT}`);
      console.log("Environment:", process.env.NODE_ENV);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
