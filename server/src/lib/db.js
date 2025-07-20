import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectDB;