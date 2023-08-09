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
      onChange={e => setSearch(e.target.value)}
      placeholder="Search for products..."
      className="bg-gray-200 rounded-xl p-3 w-full text-black"
    />
  );

  const navbar = (
    <Navbar className=" sticky mx-auto max-w-screen-xl px-4 py-3 border-0">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4  text-black font-bold cursor-pointer py-1.5"
        >
          Electric Store
        </Typography>

        <div className="relative flex w-full gap-0 md:w-max">
          {input}
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
