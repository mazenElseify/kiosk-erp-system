require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} in ${process.env.NODE_ENV} mode`);
});