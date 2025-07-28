import React from 'react'



function Button({behaviour,type}) {
return (
    <div>
        <button className="w-full bg-clr-orange-500 text-white textStyleBold22 py-3 px-6 rounded-lg hover:bg-clr-orange-600 transition-colors duration-200" type={type}>
            {behaviour === "register" ? "Register" : "Login"}
        </button>
    </div>
)
}

export default Button