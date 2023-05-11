const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://3lawix9:Az123123@cluster123.fbnf62z.mongodb.net/e-commerce?retryWrites=true&w=majority';
export async function dbConnect() {

    try {
        await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
         
        });
        console.log('MongoDB connected');
      } catch (error) {
        console.log('MongoDB connection error:', error);
      }
    }
    
    