"use client"
import '../src/app/globals.css'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import Layout from '../Components/Layout'
import {ProductsContext} from "../Components/ProductsContext";



function CheckoutNow() {
  const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    console.log("id okkkkkkkkkk : " + uniqIds);
    fetch('/api/products?ids=' + uniqIds.join(' '))
    .then((response) => response.json())
    .then((json) => setProductsInfos(json))
    .catch((error) => {
      console.error('Error fetching product data:', error);
      // Handle the error state if needed
  })},[selectedProducts])
  

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

  const delivery = 12;
  let subtotal = 200;
  // if (selectedProducts?.length) {
  //   for (let id of selectedProducts) {
  //     const price = productsInfos.map(p => p._id === id)?.price || 0;
  //     subtotal += price;
  //   }
  // }
  const total = subtotal + delivery;
  

  return (
      <Layout>
          {!productsInfos.length && (
              
            <div> {console.log("hi" , productsInfos.length)}</div>
          )}
            {productsInfos.length && productsInfos.map(product => (
               <div className="flex mb-5 " key={product._id}>
               <div className="bg-gray-100 p-3 rounded-xl shrink-0" >
                <Image width={200} height={200} src={`/products/${product.picture}`} priority={true} alt='image' />
                </div>
               <div className="pl-4 items-center">
                 <h3 className="font-bold text-lg">{product.name}</h3>
                 <p className="text-sm leading-4 text-gray-500">{product.description}</p>
                 <div className="flex mt-1">
                   <div className="grow font-bold">{product.price}</div>   
                  <div>
                <button onClick={() => lessOfThisProduct(product._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                <span className="px-2">
                  {selectedProducts.filter(id => id === product._id).length}
                </span>
                <button onClick={() => moreOfThisProduct(product._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-8">
          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="إسم المستخدم"/>
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="الإيميل"/>
          <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="إسم الحي"/>
          <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="إسم المدينة"/>
        </div>
        <div className="mt-8">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">{subtotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">{delivery}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-black">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">{total}</h3>
          </div>
        </div>

        </Layout>
      

          
  )
}

export default CheckoutNow;