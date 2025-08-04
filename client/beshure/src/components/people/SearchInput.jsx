import React from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function SearchInput() {
  const {register, handleSubmit} = useForm()
  const naviate = useNavigate()
  const searchQuery = (data) => {
    if(data.search.length > 2) {
      // Navigate to the search page with the search query
      naviate(`/search?s=${data.search}`) 
    }
  }
  return (
    <div className='flex flex-col sm:flex-row items-center text-clr-brown-500 gap-4 md:gap-0 bg-white justify-between rounded-md py-2 px-3 shadow-md mx-20  '>
       <div className='flex items-center'>
         <img src='search.svg' alt='search icon' className='w-4 h-4 mr-2' />
        <input type="text" placeholder='Search for products ' className='border-none outline-none overflow-scroll' {...register("search")} />
       </div>
        <button className='textStyleBold22 btn-primary text-white bg-clr-orange-500 cursor-pointer hover:bg-orange-800 rounded-sm px-3 py-1 transition-all duration-150 transform hover:scale-105 active:scale-95 w-full' onClick={handleSubmit(searchQuery)}>Search</button>
    </div>
  )
}

export default SearchInput