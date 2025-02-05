const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
 deviceId: { type: String, required: true },
 lastSeen: { type: Date, default: Date.now },
 status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Device', deviceSchema);