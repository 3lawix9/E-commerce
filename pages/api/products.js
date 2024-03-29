import mongoose from 'mongoose';

// Define the product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    category: String,
    picture: String
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

// Connect to the MongoDB database
export async function dbConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    const MONGODB_URL = 'mongodb+srv://Ali:Az123123@cluster111.qlrtxpo.mongodb.net/?retryWrites=true&w=majorityE-commerce';

    return mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

// Fetch all products from the database
export async function findAllProducts() {
    return Product.find().exec();
}

// API handler function
export default async function handler(req, res) {
    try {
        // Connect to the database
        await dbConnect();
        
        const { ids } = req.query;
        if (ids) {
            const idsArray = ids.split(',');
            console.log('idsarray', idsArray);

            // Fetch products based on provided IDs
            const products = await Product.find({
                '_id': { $in: idsArray }
            }).exec();
            
            res.json(products);
            console.log(products);
        } else {
            console.log('No IDs found for products');
            
            // Fetch all products
            const allProducts = await findAllProducts();
            res.json(allProducts);
        }
        
        console.log('Connected to database');
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}
