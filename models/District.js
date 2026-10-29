const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    tamilName: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    primaryCrop: { type: String, required: true },
    hub: { type: String, required: true },
    adminName: { type: String, default: '' },
    adminEmail: { type: String, default: '' },
    adminBadge: { type: String, default: '' },
    activeFarmers: { type: Number, default: 240 },
    activeShipments: { type: Number, default: 12 }
}, { timestamps: true });

module.exports = mongoose.model('District', DistrictSchema);
