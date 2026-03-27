import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })
        await mongoose.connect(process.env.MONGO_URL as string);
    }catch(err){
        console.error('Error connecting to MongoDB:', err);

    }
}
export default connectDB;