// src/controllers/sensorData.controller.js
const sensorDataService = require('../services/sensorDataService');

const createSensorData = async (req, res, next) => {
  try {
    const data = await sensorDataService.createSensorData(req.body);
    // Emit real-time update if Socket.io is attached to the request
    if (req.io) {
      req.io.emit('new-data', data);
    }
    res.status(201).json({ message: 'Data saved successfully', data });
  } catch (error) {
    next(error);
  }
};

const getSensorData = async (req, res, next) => {
  try {
    const data = await sensorDataService.getLatestSensorData();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { createSensorData, getSensorData };
