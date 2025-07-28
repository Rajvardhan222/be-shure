import React from "react";

function AlertBox({ children ,whenClose}) {
    let [isOpen, setIsOpen] = React.useState(true);
    let [shouldRender, setShouldRender] = React.useState(true);

    const handleClose = () => {
        setIsOpen(false);
        // Wait for animation to complete before unmounting
        setTimeout(() => {
            setShouldRender(false);
        }, 300);
    };

    if(!shouldRender) {
       return <div onClick={() => {
        setIsOpen(true);
        setShouldRender(true);
       }}>
        {whenClose()}
       </div>
    }

  return (
    <div className={`absolute w-screen h-screen bg-black/40 backdrop-blur-xs top-0 left-0 transform transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : " opacity-0"}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg w-[90%]">
        <div className="relative backdrop-blur-lg rounded-2xl bg-white/70 p-6 overflow-hidden">
          {/* Mac-like window controls */}

          <div className="absolute top-4 left-4 flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 hover:cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:cursor-pointer"></div>
          </div>

          {/* Content */}

         {children}

          {/* Buttons in Mac style */}
          <div className="flex justify-center space-x-4 mt-6">
            <button className="px-6 py-1.5 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300 transition cursor-pointer"
            onClick={handleClose}
            >
              Cancel
            </button>
            <button className="px-6 py-1.5 bg-blue-500 rounded-md text-white hover:bg-blue-600 transition">
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertBox;
