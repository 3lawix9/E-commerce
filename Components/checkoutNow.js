"use client"
import '../src/app/globals.css'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Layout from './Layout'
import {ProductsContext} from "./ProductsContext";



function CheckoutNow() {
  const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  
    
  

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    if (uniqIds.length > 0) {
    fetch('http://localhost:3000/api/products?ids='+uniqIds.join(','))
    .then((response) => response.json())
    .then((json) => setProductsInfos(json))
    .catch((error) => {
      console.error('Error fetching product data:', error);
  })}},[selectedProducts])
  

  function moreOfThisProduct(id) {
    setSelectedProducts(prev => [...prev,id]);
  }
  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts( prev => {
        return prev.filter((value,index) => index !== pos);
      });
    }
  }

  const delivery = 12 ;
  let subtotal = 0 ;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const product = Object.values(productsInfos).find(p => p._id === id);
      const priceString = product?.price || '0';
      const priceNumeric = parseFloat(priceString.replace(/[^\d.]/g, ''));
      subtotal += priceNumeric;
    }
  }
  
  const total = subtotal + delivery;
  

  return (
<Layout>
      {!productsInfos.length && (
        <div>no products in your shopping cart</div>
        
      )}
            {selectedProducts && productsInfos.length && productsInfos.map(product => {
              const amount = selectedProducts.filter(id => id === product._id).length;
                if (amount === 0) return;
              return (
               <div className="flex mb-5 " key={product._id}>
               <div className="bg-gray-100 p-3 rounded-xl shrink-0" >
                <Image width={200} height={200} src={`/products/${product.picture}`} priority={true} alt='image' />
                </div>
               <div className="pl-4 items-center ">
                 <h3 className="font-bold text-lg">{product.name}</h3>
                 <p className="text-sm leading-4 text-gray-500">{product.description}</p>
                      
                  <div>
                    <div className="flex flex-row mt-5">
                    <div className=" font-bold mr-48  " style={{ direction: 'rtl' }}>{product.price}</div>
                    <button onClick={() => lessOfThisProduct(product._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                <span className="px-2">
                  {selectedProducts.filter(id => id === product._id).length}
                </span>
                <button onClick={() => moreOfThisProduct(product._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button></div> 
                
              </div>
            
          </div>
        </div>
)})}
      <form action='/api/checkout' method='POST'>
      <div className="mt-8">
          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="إسم المستخدم"/>
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="الإيميل"/>
          <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="إسم الحي"/>
          <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="إسم المدينة"/>
        </div>
        <div className="mt-8">
          <div className="flex my-3">
            <h3 className="font-bold ml-12 grow">{subtotal.toLocaleString('en-US')} SAR</h3>
            <h3 className=" font-bold text-gray-400 ">سعر المنتج</h3>
          </div>
          <div className="flex my-3">
            <h3 className="font-bold ml-12 grow">{delivery} SAR</h3>
            <h3 className=" font-bold text-gray-400 ">سعر التوصيل </h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-black">
            <h3 className="font-bold ml-12 grow">{total.toLocaleString('en-US')} SAR</h3>
            <h3 className=" font-bold text-gray-400 ">المجموع</h3>
          </div>
          <input type="hidden" name="name" value={name}/>
          <input type="hidden" name="products" value={selectedProducts}/>
          <button className="w-full bg-blue-600 p-4 rounded-xl font-bold shadow-xl text-white  ">دفع الآن  </button>
        </div>
        </form>

        </Layout>
      

          
  )
}

export default CheckoutNow;