const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    password: { type: String, default: '' },
    googleId: { type: String, default: '', sparse: true },
    avatar: { type: String, default: '' },
    role: {
        type: String,
        enum: ['farmer', 'consumer', 'bulk', 'logistics', 'admin'],
        default: 'consumer'
    },
    state: { type: String, default: 'Tamil Nadu' },
    district: { type: String, default: 'Chennai' },
    taluk: { type: String, default: '' },
    pattaChittaNumber: { type: String, default: '' },
    fpoAffiliation: { type: String, default: '' },
    companyName: { type: String, default: '' },
    gstin: { type: String, default: '' },
    vehicleType: { type: String, default: '' },
    vehicleNumber: { type: String, default: '' },
    pincode: { type: String, default: '' },
    upiId: { type: String, default: '' },
    address: { type: String, default: '' },
    kycStatus: {
        type: String,
        enum: ['unverified', 'pending', 'verified'],
        default: 'verified'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
