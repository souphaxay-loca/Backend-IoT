const deviceService = require("../services/deviceService");

// src/controllers/device.controller.js
const heartbeat = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Debug log

    if (!req.body || !req.body.deviceId) {
      return res.status(400).json({
        error: "Missing deviceId in request body",
      });
    }

    const { deviceId } = req.body;
    const device = await deviceService.updateHeartbeat(deviceId);

    if (req.io) {
      req.io.emit("device-status", {
        deviceId: device.deviceId,
        status: device.status,
        lastSeen: device.lastSeen,
      });
    }

    res.json(device);
  } catch (error) {
    console.error("Heartbeat error:", error); // Debug log
    res.status(500).json({ error: error.message });
  }
};

// For background check results
const checkDevices = async (req, res) => {
  try {
    const result = await deviceService.checkOfflineDevices();
    const stats = await deviceService.getDeviceStats();
    res.json({
      devicesMarkedOffline: result.modifiedCount,
      ...stats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  heartbeat,
  checkDevices,
};
