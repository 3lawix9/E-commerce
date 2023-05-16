"use client"
import React, { useState, useEffect } from 'react';
import Items from './Items';

export default function App() {
  const [productInfo, setProductInfo] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(json => setProductInfo(json));
  }, []);

  const categoriesNames = [...new Set(productInfo.map(item => item.category))];
  
  const filteredProducts = productInfo.filter(
    item =>
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='p-5'>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='Search for products...' className='bg-gray-200 rounded-xl p-3 w-full text-black' />
      {categoriesNames.map(categoryName => (
        <div key={categoryName}>
          {filteredProducts.find(p => p.category === categoryName) && (
            <div>
              <h1 className=' text-2xl font-bold mb-5 p-7'>{categoryName}</h1>
          <div className="flex gap-4 overflow-x-scroll snap-x scrollbar-hide">
          {filteredProducts.filter(item => item.category === categoryName).map(product => (
            <div key={product._id} >
              <Items {...product }  />
            {console.log({productInfo})}

            </div>
          ))}
          </div>
            </div>
          )}
          
          
        </div>
      ))}
    </div>
  );
}



