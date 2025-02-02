// src/routes/sensorData.routes.js
const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController');

// POST endpoint to create new sensor data
router.post('/sensor-data', sensorDataController.createSensorData);

// GET endpoint to retrieve sensor data
router.get('/sensor-data', sensorDataController.getSensorData);

module.exports = router;
