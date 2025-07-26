import React from 'react'

function SearchInput() {
  return (
    <div className='flex flex-col sm:flex-row items-center text-clr-brown-500 gap-4 md:gap-0 bg-white justify-between rounded-md py-2 px-3 shadow-md mx-20  '>
       <div className='flex items-center'>
         <img src='search.svg' alt='search icon' className='w-4 h-4 mr-2' />
        <input type="text" placeholder='Search for products ' className='border-none outline-none overflow-scroll' />
       </div>
        <button className='textStyleBold22 btn-primary text-white bg-clr-orange-500 rounded-sm px-3 py-1  w-full '>Search</button>
    </div>
  )
}

export default SearchInput