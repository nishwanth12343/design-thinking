const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const os = require('os');
require('dotenv').config();

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const dev of Object.values(interfaces)) {
        for (const details of dev) {
            if (details.family === 'IPv4' && !details.internal) {
                return details.address;
            }
        }
    }
    return '127.0.0.1';
}

const app = express();
let PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/farmdirect';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname, './')));

// Mount API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
app.use(apiRoutes);

// Root route opens index.html (Home Page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
.then(async () => {
    console.log('✅ [MongoDB] Successfully connected to FarmDirect Database.');
    try {
        const seedDatabase = require('./seed');
        await seedDatabase();
    } catch (err) {
        console.error('❌ [Seed] Database seeding failed:', err.message);
    }
})
.catch((err) => {
    console.warn('⚠️ [MongoDB Warning] Local MongoDB instance connection alert:', err.message);
    console.warn('⚠️ Database-backed writes will return HTTP 503 until MongoDB reconnects.');
});

// Start Server with Auto-Port Retry on EADDRINUSE
function startServer(portToTry) {
    const server = app.listen(portToTry, '0.0.0.0', () => {
        const localIp = getLocalIp();
        console.log(`\n🚀 ===============================================`);
        console.log(`🌱 [FarmDirect Server] LIVE at:`);
        console.log(`💻 Local (PC):          http://localhost:${portToTry}`);
        console.log(`📱 Mobile (Same Wi-Fi): http://${localIp}:${portToTry}`);
        console.log(`🌐 [REST API Health]:   http://${localIp}:${portToTry}/api/health`);
        console.log(`===============================================\n`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.warn(`⚠️ Port ${portToTry} is in use, trying port ${Number(portToTry) + 1}...`);
            startServer(Number(portToTry) + 1);
        } else {
            console.error('❌ Server error:', err);
        }
    });
}

startServer(PORT);
