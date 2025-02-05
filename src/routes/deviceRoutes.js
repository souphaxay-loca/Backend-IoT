const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const Device = require('../models/Device');

router.post('/heartbeat', deviceController.heartbeat);
router.get('/check-devices', deviceController.checkDevices);


module.exports = router;