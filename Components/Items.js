"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import iphone from '../public/products/iphone.png'


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
        <h1 className='text-bold mb-5 p-7'>mobiles</h1>
        ))}
      </div>
        <div className="py-4 ">
        <div className="w-64 border-black border-solid">
        <div className="bg-cyan-400 p-5 rounded-xl">
        <Image alt="phone" src={iphone} width={200} height={200} />
        </div>
        <div className="">
            <h2 className=' uppercase font-bold text-red-500 mb-2 mt-4'>Iphone 14 Pro max</h2>
            <p className='leading-5 mb-5 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita nulla fugit exercitationem cum dolore voluptas temp</p>
        </div>
        <div className="flex mt-1">
            <h2 className='font-bold text-lg grow'>899$</h2>
            <button className=' bg-blue-500 rounded-lg p-2 ' >اضافة الى عربية التسوق</button>
        </div>
        </div>
        </div>
        
        
    </div>
  )
}

export default Items