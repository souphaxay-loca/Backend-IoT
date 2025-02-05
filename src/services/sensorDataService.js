// src/services/sensorData.service.js
const SensorData = require('../models/sensorData');

const createSensorData = async (sensorPayload) => {
  try {
    // Basic validation of required sensor data
    if (!sensorPayload.temperature || !sensorPayload.humidity || !sensorPayload.mq3) {
      throw new Error('Missing required sensor readings');
    }

    const sensorData = new SensorData(sensorPayload);
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
