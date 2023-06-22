const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Order from "../../Schemas/Order";
import { dbConnect, Product  } from "./products";


export default async function handler(req, res) {

    await dbConnect()


    if (req.method !== 'POST') {
        res.json('should a post but its not!');
        return;
      }

      const {email,name,address,city} = req.body;
      console.log(email , name , address , city);
      const productsIds = req.body.products.split(',');
      console.log(productsIds + "api products ids");
      const uniqIds = [...new Set(productsIds)];
      console.log(uniqIds);
      const products = await Product.find({_id:{$in:uniqIds}}).exec();

      console.log(products + "final resort");
      
  

    let line_items = [];
    for (let productId of uniqIds) {
      const quantity = productsIds.filter(id => id === productId).length;
      const product = products.find(p => p._id.toString() === productId);
      parseFloat(product.price.replace(/[^\d.]/g, ''));
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:product.name},
          unit_amount: parseFloat(product.price.replace(/[^\d.]/g, '')) * 100, // delete ريال سعودي  from price 
        },
      });
    }
  
    const order = await Order.create({
      products:line_items,
      name: name.toString(), // Ensure name is passed as a string
      email,
      address,
      city,
      paid:0,
    });
  
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
      metadata: {orderId:order._id.toString()},
    });
  
    res.redirect(303, session.url);
  }
  




