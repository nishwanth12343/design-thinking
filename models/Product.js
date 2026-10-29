const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tamilName: { type: String, default: '' },
    category: { type: String, required: true },
    district: { type: String, required: true, default: 'Erode' },
    farmer: { type: String, required: true },
    farmerId: { type: String, default: 'TN-F-101' },
    location: { type: String, required: true },
    lat: { type: Number, default: 11.3410 },
    lng: { type: Number, default: 77.7172 },
    price: { type: Number, required: true },
    mandiPrice: { type: Number, required: true },
    retailPrice: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    stock: { type: Number, required: true },
    qualityScore: { type: Number, default: 95 },
    harvestDate: { type: String, required: true },
    organic: { type: Boolean, default: true },
    giTag: { type: Boolean, default: false },
    grade: { type: String, default: 'Grade A+ Export' },
    image: { type: String, required: true },
    description: { type: String, default: '' },
    shelfLife: { type: String, default: '7 Days' },
    pesticideFree: { type: String, default: '100% Certified Residue Free' },
    adminVerified: { type: Boolean, default: true },
    verifiedAt: { type: Date, default: Date.now },
    verifiedBy: { type: String, default: 'Tamil Nadu Agriculture Nodal Officer' }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
