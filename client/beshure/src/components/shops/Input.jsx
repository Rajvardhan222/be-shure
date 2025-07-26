import React from 'react'

function Input() {
  return (
    <div>
        <input 
          type="text" 
          placeholder="Enter your input here" 
          className="w-full border rounded-lg bg-clr-gray-800 text-white border-clr-brown-700 textStyleBodyMedium px-4 py-3 focus:outline-none focus:border-clr-orange-500 focus:ring-1 focus:ring-clr-orange-500 transition-colors duration-200" 
        />
    </div>
  )
}

export default Input