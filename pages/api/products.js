import { dbConnect } from '../../utils/dbconnect';
import Product from '../../models/ProductSchema';

export default async function handler(req, res) {
    try {
      // Connect to database
      await dbConnect();
      console.log('Connected to database');
  
      // Query database for all products
      const products = await Product.find({}).limit(10);
      console.log('Products:', products);
  
      res.json(products);
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }