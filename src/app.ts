import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

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
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response): void => {
    res.json({
        message: "Kiosk API is running",
        version: '1.0.0'
    });
}); 

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler - catch all unmatched routes
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: 'Route not found' });
});

export default app;