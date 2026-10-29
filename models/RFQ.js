const mongoose = require('mongoose');

const RFQSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    gstin: { type: String, required: true },
    hub: { type: String, required: true },
    contact: { type: String, required: true },
    crop: { type: String, required: true },
    tonnage: { type: Number, required: true },
    targetPrice: { type: Number, required: true },
    cadence: { type: String, default: 'spot' },
    coldChain: { type: String, default: 'reefer' },
    estimatedTotal: { type: Number, required: true },
    status: { type: String, default: 'Broadcasted to FPOs' }
}, { timestamps: true });

module.exports = mongoose.model('RFQ', RFQSchema);
