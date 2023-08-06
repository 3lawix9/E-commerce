"use client"
import React, { useState, useEffect } from 'react';
import Items from './Items';
import Layout from './Layout';
import {
  Navbar,
  Typography,
  IconButton,
  Button,
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
      onChange={e => setSearch(e.target.value)}
      placeholder="Search for products..."
      className="bg-gray-200 rounded-xl p-3 w-full text-black"
    />
  );

  const navbar = (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 ml-2 text-black font-bold cursor-pointer py-1.5"
        >
          Electric Store
        </Typography>
        <div className="ml-auto flex gap-4 md:mr-4">
          <IconButton variant="text">
            <Cog6ToothIcon className="text-gray-600 h-4 w-4" />
          </IconButton>
          <IconButton variant="text">
            <BellIcon className="text-gray-600 h-4 w-4" />
          </IconButton>
        </div>
        <div className="relative flex w-full gap-0 md:w-max">
          {input}
        </div>
       
      </div>
    </Navbar>
  );

  return (
    <>
        {navbar}
        {categoriesNames.map(categoryName => (
          <div key={categoryName}  className='lg:ml-24'>
            {filteredProducts.find(p => p.category === categoryName) && (
              <div>
                <h1 className=" text-2xl capitalize  font-bold mb-5 p-7">
                  {categoryName}
                </h1>
                <div className="flex gap-4 overflow-x-scroll snap-x scrollbar-hide">
                  {filteredProducts.filter(item => item.category === categoryName).map(product => (
                    <div key={product._id}>
                      <Items {...product} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    <Layout/>
    </>
  );
}
