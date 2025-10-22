import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 5000;

connectDB();

// Start the server
app.listen(PORT, (): void => {
    console.log(`Server is running on port: ${PORT} in ${process.env.NODE_ENV} mode`);
});