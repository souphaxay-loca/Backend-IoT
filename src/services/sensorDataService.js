// src/services/sensorData.service.js
const SensorData = require('../models/sensorData');

const createSensorData = async (data) => {
  try {
    const sensorData = new SensorData(data);
    return await sensorData.save();
  } catch (error) {
    throw error;
  }
};

const getLatestSensorData = async (limit = 100) => {
  try {
    return await SensorData.find().sort({ timestamp: -1 }).limit(limit);
  } catch (error) {
    throw error;
  }
};

module.exports = { createSensorData, getLatestSensorData };
