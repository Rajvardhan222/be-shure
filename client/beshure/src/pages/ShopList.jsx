import React from 'react'
import Button from '../components/shops/Button'
import MyShopCard from '../components/shops/MyShopCard'

function ShopList() {
  return (
    <div className='max-w-[900px] m-auto h-screen w-screen'>
        <div className='flex items-center justify-between p-4'>
            <h1>My Shops</h1>
            <button className='bg-clr-gray-100 cursor-pointer  py-2 px-4 rounded-lg'>Add a Shop</button>
        </div>
        <div className='mx-6'>
           {


           Array.from({ length: 5 }, (_, index) => (
               <MyShopCard key={index} />
           ))}
        </div>
    </div>
  )
}

export default ShopList