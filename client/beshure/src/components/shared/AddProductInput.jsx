import React from 'react'

function AddProductInput({
  label,
  name,
  placeholder,
  type,
  error,
  required = false,
  className = "",
  ...props
}, ref) {
  return (
    <div className="w-full">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input 
        ref={ref} 
        name={name}
        {...props}  
        type={type} 
        id={name} 
        className={`mt-1 block w-full border rounded-md p-2 transition-colors duration-200 ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        } ${className}`}
        placeholder={placeholder} 
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p 
          id={`${name}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default React.forwardRef(AddProductInput)