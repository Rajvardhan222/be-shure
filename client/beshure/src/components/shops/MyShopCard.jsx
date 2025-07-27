import React from 'react'

function MyShopCard() {
  return (
    <div className='flex md:flex  flex-col-reverse sm:flex-row items-start justify-between  p-4 rounded-lg  gap-x-4 gap-y-2 bg-clr-white-off sm:bg-white my-4'>
        <div className='flex flex-col gap-y-3 sm:gap-y-2'>
            <div className='textStyleBold22'>The Corner Store</div>
            <div className='text-clr-brown-500 textStyleRegular14'>Location: 123 Main St</div>
            <div className='textStyleBodyMedium bg-clr-gray-100 p-2 rounded-lg cursor-pointer text-center '>
                Add a Product
            </div>
        </div>
       
            <img className='w-full h-26 sm:h-44 sm:w-44 rounded-lg object-cover' src="shop.png" alt="" />
        
    </div>
  )
}

export default MyShopCard