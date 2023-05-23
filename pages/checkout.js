"use client"
import '../src/app/globals.css';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import Layout from '../Components/Layout'
import {ProductsContext} from "../Components/ProductsContext";



function CheckoutNow() {
  const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
  const [itemsInfos, setItemsInfos] = useState([]);
  

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    console.log("id okkkkkkkkkk : " + uniqIds);
    fetch('/api/products?ids=' + uniqIds.join(' '))
    .then((response) => response.json())
    .then((json) => setItemsInfos(json))
    .catch((error) => {
      console.error('Error fetching product data:', error);
      // Handle the error state if needed
  })},[selectedProducts])
  

  // function moreOfThisProduct(id) {
  //   setSelectedProducts(prev => [...prev,id]);
  // }
  // function lessOfThisProduct(id) {
  //   const pos = selectedProducts.indexOf(id);
  //   if (pos !== -1) {
  //     setSelectedProducts( prev => {
  //       return prev.filter((value,index) => index !== pos);
  //     });
  //   }
  // }
  

  return (
      <Layout>
          {!itemsInfos.length && (
              
            <div> {console.log("hi" , itemsInfos.length)}</div>
          )}
            {itemsInfos.length && itemsInfos.map(product => (
               <div className="flex mb-5 " key={product._id}>
               <div className="bg-gray-100 p-3 rounded-xl shrink-0" >
                <Image width={200} height={200} src={`/products/${product.picture}`} priority={true} alt='image' />
                </div>
               <div className="pl-4 items-center">
                 <h3 className="font-bold text-lg">{product.name}</h3>
                 <p className="text-sm leading-4 text-gray-500">{product.description}</p>
                 <div className="flex mt-1">
                   <div className="grow font-bold">{product.price}</div>   
                  {/* <div>
                <button onClick={() => lessOfThisProduct(product._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                <span className="px-2">
                  {selectedProducts.filter(id => id === product._id).length}
                </span>
                <button onClick={() => moreOfThisProduct(product._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
              </div> */}
            </div>
          </div>
        </div>
      ))}

        </Layout>
      

          
  )
}

export default CheckoutNow;