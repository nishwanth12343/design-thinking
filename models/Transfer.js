const mongoose = require('mongoose');

const TransferSchema = new mongoose.Schema({
    transferId: { type: String, required: true, unique: true },
    cropName: { type: String, required: true },
    productName: { type: String, default: '' },
    originDistrict: { type: String, required: true },
    targetDistrict: { type: String, required: true },
    quantity: { type: Number, default: 100 },
    unit: { type: String, default: 'kg' },
    status: { type: String, default: 'Dispatched in Cold-Chain Reefer' },
    eta: { type: String, default: '3.5 Hours' },
    distanceKm: { type: Number, default: 120 },
    temp: { type: String, default: '3.8°C' }
}, { timestamps: true });

module.exports = mongoose.model('Transfer', TransferSchema);
