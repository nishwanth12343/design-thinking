const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
    hubId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    district: { type: String, required: true },
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    totalCapacityMetricTons: { type: Number, required: true, default: 2500 },
    occupiedMetricTons: { type: Number, required: true, default: 1850 },
    chamberTemp: { type: String, default: '3.8°C' },
    targetTemp: { type: String, default: '4.0°C' },
    humidity: { type: String, default: '88%' },
    availableSlots: { type: Number, default: 14 },
    managerName: { type: String, default: 'Logistics Supervisor' },
    managerPhone: { type: String, default: '+91 94432 00112' },
    status: { type: String, enum: ['operational', 'maintenance', 'full'], default: 'operational' },
    reservations: [{
        code: { type: String },
        crop: { type: String },
        quantity: { type: String },
        date: { type: String },
        duration: { type: String },
        tempZone: { type: String },
        userName: { type: String },
        userPhone: { type: String },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', WarehouseSchema);
