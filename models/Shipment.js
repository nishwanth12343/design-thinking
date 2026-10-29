const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    driver: { type: String, required: true },
    driverPhone: { type: String, default: '+91 94432 10987' },
    originDistrict: { type: String, default: 'Erode' },
    destDistrict: { type: String, default: 'Chennai' },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    highwayCorridor: { type: String, default: 'NH544 / NH44 (Salem-Chennai Expressway)' },
    temp: { type: String, default: '3.8°C' },
    targetTemp: { type: String, default: '4.0°C' },
    humidity: { type: String, default: '88%' },
    eta: { type: String, default: '1 hr 15 mins' },
    routeEfficiency: { type: String, default: '96%' },
    fuelSaved: { type: String, default: '14.5 Liters' },
    co2Saved: { type: String, default: '38 kg' },
    status: { type: String, default: 'Active Moving' },
    lat: { type: Number, default: 11.6643 },
    lng: { type: Number, default: 78.1460 }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', ShipmentSchema);
