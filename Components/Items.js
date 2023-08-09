import React, { useContext } from 'react'
import Image from 'next/image'
import {ProductsContext} from './ProductsContext'


function Items({_id,name,price,description,picture}) {
  const image = `/products/${picture}`
  const {setSelectedProducts} = useContext(ProductsContext)
  const addProduct = () => {
    setSelectedProducts(prev => [...prev, _id])
  }
  return (
<div className="glass w-64 border border-gray-300 shadow-lg rounded-xl ">
    <div className="relative bg-gray-300 rounded-t-xl">
        <Image priority={true} alt='image' src={image} width={220} height={220}   />
        <div className="absolute top-0 left-0 bg-black text-white opacity-80 p-2 rounded-tl-xl">
            New Arrival
        </div>
    </div>
    <div className="p-4">
        <h2 className='text-lg font-semibold text-black-500 mb-2 '>{name}</h2>
        <p className='flex-1 text-gray-600 leading-6 mb-4'>{description}</p>
        <div className="flex items-center justify-between"> 
            <h2 className='text-lg font-bold text-gray-800'>{price}</h2>
            <button onClick={addProduct} className='btn btn-info'>
                Add to Cart
            </button>
        </div>
    </div>
</div>
 )
}

export default Items