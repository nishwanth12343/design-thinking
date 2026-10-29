const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    buyerName: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    review: { type: String, required: true },
    date: { type: String, default: () => new Date().toLocaleDateString() }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
