const mongoose = require('mongoose');

const PriceBenchmarkSchema = new mongoose.Schema({
    commodity: { type: String, required: true },
    tamilName: { type: String, default: '' },
    variety: { type: String, default: 'Standard / GI' },
    district: { type: String, required: true },
    mandiName: { type: String, required: true },
    farmgateDirectPrice: { type: Number, required: true },
    apmcMandiRate: { type: Number, required: true },
    retailMarketPrice: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    priceTrendPercentage: { type: Number, default: 2.5 },
    forecastNextWeek: { type: Number, required: true },
    lastReportedDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

module.exports = mongoose.model('PriceBenchmark', PriceBenchmarkSchema);
