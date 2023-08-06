const mongoose = require('mongoose');


export async function dbConnect() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }
    
    return await mongoose.connect('mongodb+srv://Ali:Az123123@cluster7.azbqs6b.mongodb.net/?retryWrites=true&w=majority/e-commerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export async function findAllProducts() {

        return Product.find().exec();
}

export default async function handler(req, res) {
    try {
        // Connect to database
        await dbConnect();
        const {ids} = req.query;
        if(ids) { 
            const idsArray = ids.split(',')
            console.log('idsarray', idsArray);

            res.json(
                await Product.find({
                '_id':{$in:idsArray}
            }).exec())

        }else {
            console.log("no Ids found for product");
            res.json(await findAllProducts());
        }
        console.log('Connected to database');

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    category: String,
    picture: String
});


export const Product = mongoose.models.Products || mongoose.model('Products', productSchema);