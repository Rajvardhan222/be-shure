import React from 'react'
import Input from '../shops/Input'
import {useForm} from 'react-hook-form'
import Button from '../shops/Button'

// type can be either "register" or "login" 
function Register_login({type}) {

    const {register, handleSubmit} = useForm()

    

  return (
     <div className="bg-gradient-to-br from-clr-gray-900 via-clr-brown-900 to-clr-orange-500 bg-[length:400%_400%] animate-gradient-x min-h-screen flex items-center justify-center p-8">
        <div className="flex flex-col-reverse sm:flex-row  w-full max-w-6xl bg-clr-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Left side - Form */}
          <div className=" w-full sm:w-1/2 px-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <h1 className="textStyleHeroHeading text-white mb-16 text-center">{
                type === "register" ? "Create Account" : "Welcome Back"
              }</h1>

              <form className="space-y-8"
              onSubmit={handleSubmit((data)=> {
                console.log(data);
                // Handle form submission logic here
                
              })}
              >
                <div>
                  <label className="textStyleBodyMedium text-clr-brown-300 block mb-2">Username</label>
                  <Input placeholder="Enter your username" {...register("username")} />
                </div>
                
                <div>
                  <label className="textStyleBodyMedium text-clr-brown-300 block mb-2">Password</label>
                  <Input placeholder="Enter your password" {...register("password")} />
                </div>
                
                <div className="pt-4">
                  <Button type="submit"  />
                </div>
              </form>
              
              <p className="textStyleRegular14 text-clr-brown-300 text-center m-4!">
                {type === "register" ? "Already have an account?" : "Don't have an account?"}
                <a href="/login" className="text-clr-orange-500 hover:text-clr-orange-600 ml-1">{type === "register" ? "Sign in" : "Create an account"}</a>
              </p>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className=" h-40 sm:h-auto sm:w-1/2 relative">
            <div className="aspect-square w-full h-full">
             { type == "register" ? <img 
                className="w-full h-full object-cover" 
                src="login-page.png"
                alt="Registration illustration"
              />: 
              <img 
                className="w-full h-full object-cover" 
                src="login-page-icon.png"
                alt="Login illustration"
              />
              }
            </div>
          </div>
        </div>
      </div>
  )
}

export default Register_login