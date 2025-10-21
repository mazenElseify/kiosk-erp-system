const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MONGODB Connected: ' + conn.connection.host);
    } catch (error) {
        console.log('Error: ' + error.message);
        console.log('Server will continue without database connection.');
        // process.exit(1);

    }
};

module.exports = connectDB;