const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/e-commerce'
export async function dbConnect() {

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
      } catch (error) {
        console.log('MongoDB connection error:', error);
      }
    }
    
    