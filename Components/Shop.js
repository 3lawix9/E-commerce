"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';


function Items() {
  const [ProductInfo, setProductInfo] = useState([])
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(json => setProductInfo(json))
  }, [])
  console.log({ProductInfo})

  const catogiesNames = [...new Set(ProductInfo.map(item => item.category))]
 console.log(catogiesNames);
  return (
    
    <div className='p-5 '>
      <div>
        {catogiesNames.map(categoryName => (
          <div key={categoryName}>
            <h2 className='text-bold mb-5 p-7'>{categoryName}</h2>
            {ProductInfo.filter(item => item.category === categoryName).map(product => (
              <div key={product._id}>
              <Items {...product}/> 
              </div>
              ))}
          </div>
        ))}
      </div>
        <div className="py-4 ">
        
        </div>
        
        
    </div>
  )
}

export default Items