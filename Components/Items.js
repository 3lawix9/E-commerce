import React from 'react'


function Items({name,price,description,Imageurl}) {
  return (
    <div className="w-64 border-black border-solid">
        <div className="bg-cyan-400 p-5 rounded-xl">
        <Image alt="phone" src={Imageurl} width={200} height={200} />
        </div>
        <div className="">
            <h2 className=' uppercase font-bold text-red-500 mb-2 mt-4'>{name}</h2>
            <p className='leading-5 mb-5 '>{description}</p>
        </div>
        <div className="flex mt-1">
            <h2 className='font-bold text-lg grow'>{price}</h2>
            <button className=' bg-blue-500 rounded-lg p-2 ' >اضافة الى عربية التسوق</button>
        </div>
        </div>
  )
}

export default Items