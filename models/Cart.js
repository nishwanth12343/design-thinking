const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    tamilName: { type: String, default: '' },
    price: { type: Number, required: true },
    retailPrice: { type: Number, default: 0 },
    unit: { type: String, default: 'kg' },
    image: { type: String, default: '' },
    farmer: { type: String, default: '' },
    district: { type: String, default: 'Erode' },
    deliveryDistrict: { type: String, default: 'Erode' },
    qty: { type: Number, default: 1 }
});

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true, default: 'default_user', index: true },
    deliveryDistrict: { type: String, default: 'Erode' },
    items: [CartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
