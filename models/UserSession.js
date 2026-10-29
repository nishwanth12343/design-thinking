const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true, default: 'active_session' },
    role: { type: String, default: 'consumer' },
    district: { type: String, default: 'Erode' },
    selectedDistrict: { type: String, default: 'Erode' },
    userProfile: {
        name: { type: String, default: 'Participant' },
        email: { type: String, default: 'consumer@farmdirect.io' },
        role: { type: String, default: 'consumer' },
        district: { type: String, default: 'Erode' },
        phone: { type: String, default: '' },
        badgeId: { type: String, default: '' },
        taluk: { type: String, default: '' },
        jurisdiction: { type: String, default: '' }
    },
    isAdmin: { type: Boolean, default: false },
    adminAuthenticated: { type: Boolean, default: false },
    adminDistrict: { type: String, default: 'Erode' },
    adminToken: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('UserSession', UserSessionSchema);
