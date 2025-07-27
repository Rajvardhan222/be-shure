import React from 'react'
import SearchBar from '../components/people/SearchBar'

function Search() {
  return (
    <div className=' max-w-[1000px] m-auto bg-white h-screen w-screen py-4 px-6'>
        <SearchBar/>
        <h1 className='mt-5 text-xl '>Shops that sell 'Parle-G'</h1>

       {

      Array.from({ length: 5 }, (_, index) => (
        <div key={index}>
            <div className='flex items-center justify-between bg-gray-100 p-4 rounded-lg mt-4'>
                <div >
                    <p className='textStyleBodyMedium'>Quick Mart</p>
                    <p className='textStyleRegular14 text-clr-brown-500'>123 Main St, Anytown</p>
                </div>
                <div className='textStyleBodyMedium cursor-pointer'>View on Map</div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Search