import mongoose from 'mongoose';
const connectDB = async () => {
    console.log("Connecting DataBase...");

    try {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017/sourav";
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to mongo', error);
    }
};

export default connectDB;