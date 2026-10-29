const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    userId: { type: String, required: true, default: 'default_user', index: true },
    productIds: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', WishlistSchema);
