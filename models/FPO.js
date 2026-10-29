const mongoose = require('mongoose');

const FPOSchema = new mongoose.Schema({
    fpoId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    district: { type: String, required: true },
    registeredTaluk: { type: String, required: true },
    memberCount: { type: Number, required: true, default: 450 },
    totalAcreage: { type: Number, required: true, default: 1200 },
    leadDirector: { type: String, required: true },
    directorPhone: { type: String, required: true },
    directorEmail: { type: String, default: '' },
    primaryCommodities: [{ type: String }],
    activePooledStockTons: { type: Number, default: 85 },
    currentSeasonRevenue: { type: Number, default: 4250000 },
    bankUpiId: { type: String, default: 'fpo.tn@oksbi' },
    status: { type: String, enum: ['active', 'pending_kyc', 'suspended'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('FPO', FPOSchema);
