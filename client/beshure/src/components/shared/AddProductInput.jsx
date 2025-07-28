import React from 'react'

function AddProductInput({label,name,placeholder,type,...props},ref) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700" >{label}</label>
      <input ref={ref} {...props}  type={type} id={name} className="mt-1 block w-full border-gray-300 rounded-md  outline-none" placeholder={placeholder} />
    </div>
  )
}

export default React.forwardRef(AddProductInput)