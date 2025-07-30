import React from 'react'

function Button({behaviour, type, children, disabled, ...props}) {
    const buttonText = children || (behaviour === "register" ? "Register" : "Login");
    
    return (
        <div>
            <button 
                className={`w-full text-white textStyleBold22 py-3 px-6 rounded-lg transition-colors duration-200 ${
                    disabled 
                        ? 'bg-orange-950 cursor-not-allowed' 
                        : 'bg-clr-orange-500 hover:bg-clr-orange-600'
                }`} 
                type={type}
                disabled={disabled}
                {...props}
            >
                {buttonText}
            </button>
        </div>
    )
}

export default Button