const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    msg: { type: String, required: true },
    type: { type: String, default: 'info' }, // 'success', 'warning', 'danger', 'info', 'ai'
    time: { type: String, default: 'Just now' },
    read: { type: Boolean, default: false },
    sender: { type: String, default: 'Tamil Nadu State Agricultural Admin Command' },
    senderBadge: { type: String, default: 'TN-NODAL-STATE-01' },
    targetRole: { type: String, default: 'all' }, // 'all', 'farmer', 'consumer', 'bulk', 'logistics'
    targetDistrict: { type: String, default: 'All 38 Districts' },
    senderDistrict: { type: String, default: '' },
    priority: { type: String, default: 'high' },
    messageBody: { type: String, default: '' },
    details: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
