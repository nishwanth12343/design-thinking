const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    retailPrice: Number,
    unit: String,
    image: String,
    farmer: String,
    qty: Number
});

const OrderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    customer: { type: String, required: true },
    customerEmail: { type: String, default: '' },
    address: { type: String, required: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    retailComparison: { type: Number, required: true },
    savings: { type: Number, required: true },
    status: { type: String, default: 'Order Placed & Scheduled' },
    statusStep: { type: Number, default: 1 },
    trackingId: { type: String, default: 'TRK-CC-882' },
    deliveryType: { type: String, default: 'Cold-Chain Express' },
    paymentMethod: { type: String, default: 'UPI' },
    escrowReleased: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
