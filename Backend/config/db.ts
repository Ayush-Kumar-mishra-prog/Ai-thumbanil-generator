import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!process.env.MONGO_URL) {
        throw new Error('MONGO_URL is not configured');
    }

    try{
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })
        await mongoose.connect(process.env.MONGO_URL as string);
    }catch(err){
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}
export default connectDB;
