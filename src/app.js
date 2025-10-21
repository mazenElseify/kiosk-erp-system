const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// Routes
app.get('/', (req, res) => {
    res.json({
        message: "Kiosk API is running",
        version: '1.0.0'
    });
}); 

// Error handling middleware

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });

});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;

    