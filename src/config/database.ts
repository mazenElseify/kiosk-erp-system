import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        
        const conn = await mongoose.connect(mongoUri);
        console.log('MONGODB Connected: ' + conn.connection.host);
    } catch (error) {
        console.log('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        console.log('Server will continue without database connection.');
        // process.exit(1);
    }
};

export default connectDB;