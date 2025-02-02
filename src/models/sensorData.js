const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  // Ensure every document has a timestamp field.
  timestamp: { type: Date, required: true, default: Date.now },
  temperature: { type: Number, required: true },  // °C
  humidity: { type: Number, required: true },     // Relative Humidity (%)
  mq3: { type: Number, required: true }           // Sensor reading or computed PPM
}, { 
  collection: 'sensor_data' // Ensures Mongoose interacts with the time series collection.
});

module.exports = mongoose.model('SensorData', sensorDataSchema);
