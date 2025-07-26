import React from "react";
import Input from "../components/shops/Input";
import Button from "../components/shops/Button";

function Register() {
  return (
    <>
      <div className="bg-gradient-to-br from-clr-gray-900 via-clr-brown-900 to-clr-orange-500 bg-[length:400%_400%] animate-gradient-x min-h-screen flex items-center justify-center p-8">
        <div className="flex flex-col-reverse sm:flex-row  w-full max-w-6xl bg-clr-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Left side - Form */}
          <div className=" w-full sm:w-1/2 px-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="textStyleHeroHeading text-white mb-16 text-center">Create Account</h1>
              
              <div className="space-y-8">
                <div>
                  <label className="textStyleBodyMedium text-clr-brown-300 block mb-2">Username</label>
                  <Input />
                </div>
                
                <div>
                  <label className="textStyleBodyMedium text-clr-brown-300 block mb-2">Password</label>
                  <Input />
                </div>
                
                <div className="pt-4">
                  <Button />
                </div>
              </div>
              
              <p className="textStyleRegular14 text-clr-brown-300 text-center m-4!">
                Already have an account? 
                <a href="/login" className="text-clr-orange-500 hover:text-clr-orange-600 ml-1">Sign in</a>
              </p>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className=" h-40 sm:h-auto sm:w-1/2 relative">
            <div className="aspect-square w-full h-full">
              <img 
                className="w-full h-full object-cover" 
                src="login-page.png"
                alt="Registration illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
