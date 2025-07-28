import React, { useState } from 'react'

const Switcher1 = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div className={`block h-8 w-14 rounded-full transition-all duration-300 ease-in-out 
            ${isChecked ? 'bg-clr-orange-600' : 'bg-gray-300'}
            `}></div>
          <div className={`dot absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ease-in-out ${isChecked ? 'left-7': "left-1"}`}></div>
        </div>
      </label>
    </>
  )
}

export default Switcher1