"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'

import Layout from '../Components/Layout'
import {ProductsContext} from "../Components/ProductsContext";



function CheckoutNow() {
  const {selectedProducts,setSelectedProducts} = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([])
  

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    console.log(uniqIds);
    fetch('/api/products?ids='+uniqIds.join(','))
      .then(response => response.json())
      .then(json => setProductsInfos(json));
  }, [selectedProducts]);

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
        <h1>
            {selectedProducts.join(",")}
            </h1>
        </Layout>
    )
}

export default CheckoutNow;