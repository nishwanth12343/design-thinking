const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
    senderPhone: { type: String, default: '' },
    category: {
        type: String,
        enum: ['order_issue', 'cold_chain_quality', 'payment_escrow', 'farmer_kyc', 'technical_bug', 'general'],
        default: 'general'
    },
    district: { type: String, default: 'Tamil Nadu' },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: { type: String, enum: ['open', 'investigating', 'resolved', 'closed'], default: 'open' },
    resolutionNotes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
