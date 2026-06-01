import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let connectionPromise: Promise<typeof mongoose> | null = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (connectionPromise) {
        await connectionPromise;
        return;
    }

    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not configured');
    }

    try{
        mongoose.connection.once('connected', () => {
            console.log('MongoDB connected successfully');
        })
        connectionPromise = mongoose.connect(process.env.MONGO_URL as string, {
            serverSelectionTimeoutMS: 8000,
            connectTimeoutMS: 8000,
            maxPoolSize: 5,
        });
        await connectionPromise;
    }catch(err){
        connectionPromise = null;
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}
export default connectDB;
