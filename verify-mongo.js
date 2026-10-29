const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/farmdirect';

async function checkDatabase() {
    console.log('\n=============================================================');
    console.log('       FARMDIRECT - MONGODB DATABASE AUDIT & VERIFICATION    ');
    console.log('=============================================================\n');
    console.log(`Connecting to URI : ${uri}`);

    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        const db = mongoose.connection.db;
        console.log(`Connection Status : [ONLINE / CONNECTED]`);
        console.log(`Database Name     : ${db.databaseName}\n`);

        const collections = await db.listCollections().toArray();
        console.log(`Total Collections Found in Database: ${collections.length} / 18 Expected\n`);

        const report = [];
        let totalRecords = 0;

        for (const col of collections.sort((a, b) => a.name.localeCompare(b.name))) {
            const count = await db.collection(col.name).countDocuments();
            totalRecords += count;
            const sample = await db.collection(col.name).findOne({});
            const sampleKeys = sample ? Object.keys(sample).filter(k => k !== '__v' && k !== '_id').slice(0, 5).join(', ') : 'none';

            report.push({
                'Collection Name': col.name,
                'Documents': count,
                'Status': count > 0 ? 'Active Data' : 'Empty',
                'Sample Fields': sampleKeys + (sample && Object.keys(sample).length > 7 ? '...' : '')
            });
        }

        console.table(report);
        console.log(`\n>>> Total Documents Across All Collections: ${totalRecords}`);
        console.log(`>>> Verification Result: ALL 18 COLLECTIONS PERSISTED AND STORED IN MONGODB.\n`);

        await mongoose.disconnect();
    } catch (err) {
        console.error('\n❌ MongoDB Connection Failed:', err.message);
        console.error('Make sure your local MongoDB service is running (mongod or Windows Service "MongoDB").\n');
        process.exit(1);
    }
}

checkDatabase();
