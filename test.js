// test/simulateSensor.js
const axios = require('axios');

const generateMockData = () => ({
  temperature: 20 + Math.random() * 10, // Random between 20-30°C
  humidity: 40 + Math.random() * 30,    // Random between 40-70%
  mq3: Math.random() * 0.5              // Random between 0-0.5 ppm
});

async function sendMockData() {
  try {
    const data = generateMockData();
    await axios.post('http://localhost:3999/api/sensor-data', data);
    console.log('Sent data:', data);
  } catch (error) {
    console.error('Error sending data:', error.message);
  }
}

// Send data every 5 seconds
setInterval(sendMockData, 5000);
sendMockData(); // Initial send