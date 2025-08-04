import React, { useState } from 'react'

const Switcher1 = ({ name, value, onChange, ...props }, ref) => {
  // Use controlled value from React Hook Form if provided, otherwise use internal state
  const [internalState, setInternalState] = useState(false);
  const isChecked = value !== undefined ? value : internalState;

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    
    // If onChange is provided (from React Hook Form), use it
    if (onChange) {
      onChange(checked);
    } else {
      // Otherwise, update internal state
      setInternalState(checked);
    }
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
            name={name}
            ref={ref}
            {...props}
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

export default React.forwardRef(Switcher1)