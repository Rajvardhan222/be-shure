import React from 'react'
import { useForm } from 'react-hook-form'
function SearchBar() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle search logic here
  };

  return (
    <div className='flex items-center justify-between bg-clr-white-off px-4 py-1 rounded-lg gap-x-2 flex-wrap gap-2'>
        <div className='flex items-center space-x-2  '>

        <img src="search.svg"
                alt="search icon"
                />
        <input type="text" className='flex-auto outline-none text-clr-gray-800 p-2 textStyleBody' placeholder="Search..." {...register("search")} />
        </div>
        <button className='bg-clr-orange-500 text-white py-1 my-1 font-semibold flex-auto sm:flex-none px-4 rounded-lg' onClick={handleSubmit(onSubmit)}>Search</button>
    </div>
  )
}

export default SearchBar