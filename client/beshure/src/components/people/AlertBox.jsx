import React from 'react'

function AlertBox() {
  return (
    <div className='absolute w-screen h-screen bg-black/40  backdrop-blur-xs top-0 left-0'>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   rounded-lg shadow-lg w-[90%] ">
            
            <div className="relative backdrop-blur-lg rounded-2xl bg-white/70 p-6 overflow-hidden">
                {/* Mac-like window controls */}
                <div className="absolute top-4 left-4 flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 hover:cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:cursor-pointer"></div>
                </div>
                
                {/* Content */}
                <div className="mt-8 mb-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">Do you want to proceed?</h3>
                    <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
                </div>
                
                {/* Buttons in Mac style */}
                <div className="flex justify-center space-x-4 mt-6">
                    <button className="px-6 py-1.5 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300 transition">Cancel</button>
                    <button className="px-6 py-1.5 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition">Proceed</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default AlertBox