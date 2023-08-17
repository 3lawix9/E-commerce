"use client"
import React, { useState, useEffect } from 'react';
import Items from './Items';
import Layout from './Layout';
import {
  Navbar,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function Index() {
  const [productInfo, setProductInfo] = useState([]);
  const [search, setSearch] = useState('');

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

  const input = (
    <Input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search for products..."
      className="bg-white text-gray-800 rounded-full py-2 px-4 w-full focus:outline-none shadow-sm"
    />
  );
  
  const navbar = (
    <Navbar className="sticky top-0 left-0 right-0  px-4 py-3 border-b border-gray-300">
      <div className="flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="text-gray-800 font-bold cursor-pointer "
        >
          Electric Store
        </Typography>
  
        <div className="relative flex w-full md:w-64">
          {input}
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </Navbar>
  );
  

  return (
    <Layout>
        {navbar}
        {categoriesNames.map(categoryName => (
          <div key={categoryName}  className='sm:ml-24'>
            {filteredProducts.find(p => p.category === categoryName) && (
              <div>
                <h1 className=" text-2xl capitalize  font-bold mb-5 p-7">
                  {categoryName}
                </h1>
                <div className="flex gap-4 overflow-x-scroll snap-x scrollbar-hide">
                  {filteredProducts.filter(item => item.category === categoryName).map(product => (
                    <div key={product._id} >
                      <Items {...product} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </Layout>
  );
}
