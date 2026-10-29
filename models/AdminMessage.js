const mongoose = require('mongoose');

const AdminMessageSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['admin_to_admin', 'admin_to_user'],
        default: 'admin_to_admin'
    },
    senderDistrict: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        default: 'District Nodal Officer'
    },
    senderBadge: {
        type: String,
        default: 'TN-NODAL-01'
    },
    // For admin_to_admin communications
    recipientDistrict: {
        type: String,
        default: ''
    },
    // For admin_to_user communications
    recipientUserId: {
        type: String,
        default: ''
    },
    recipientUserEmail: {
        type: String,
        default: ''
    },
    recipientUserName: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        enum: ['produce_exchange', 'cold_storage', 'transport', 'mandi_pricing', 'weather_alert', 'kyc_directive', 'general'],
        default: 'general'
    },
    priority: {
        type: String,
        enum: ['normal', 'urgent', 'emergency'],
        default: 'normal'
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('AdminMessage', AdminMessageSchema);
