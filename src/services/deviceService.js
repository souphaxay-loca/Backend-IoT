const Device = require("../models/Device"); 

const updateHeartbeat = async (deviceId) => {
  return await Device.findOneAndUpdate(
    { deviceId },
    { lastSeen: new Date(), status: "active" },
    { upsert: true, new: true }
  );
};

const checkOfflineDevices = async () => {
  const threshold = new Date(Date.now() - 60000);
  return await Device.updateMany(
    { lastSeen: { $lt: threshold }, status: "active" },
    { status: "offline" }
  );
};

const getDeviceStats = async () => {
    const allDevices = await Device.find({});
    return {
      totalDevices: allDevices.length,
      offlineDevices: allDevices.filter(d => d.status === 'offline').length,
      activeDevices: allDevices.filter(d => d.status === 'active').length
    };
  };

module.exports = { updateHeartbeat, checkOfflineDevices, getDeviceStats };