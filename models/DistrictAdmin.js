const mongoose = require('mongoose');

const DistrictAdminSchema = new mongoose.Schema({
    district: {
        type: String,
        required: true,
        unique: true, // Strictly ONE admin per district
        trim: true
    },
    adminName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    officialBadgeId: {
        type: String,
        required: true,
        unique: true
    },
    jurisdiction: {
        type: String,
        default: 'District Agriculture & Mandi Nodal Command'
    },
    assignedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'transferred', 'leave'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('DistrictAdmin', DistrictAdminSchema);
