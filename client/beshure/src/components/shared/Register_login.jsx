import React from "react";
import Input from "../shops/Input";
import { useForm } from "react-hook-form";
import Button from "../shops/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../store/features/user.actions.js";
import { 
  selectIsLoading, 
  selectError, 
  selectIsAuthenticated,
  clearError 
} from "../../store/features/user.reducer.js";

// type can be either "register" or "login"
function Register_login({ type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  // Local success message state
  const [successMessage, setSuccessMessage] = React.useState("");

  // Clear error when component mounts or type changes
  React.useEffect(() => {
    dispatch(clearError());
    setSuccessMessage("");
  }, [type, dispatch]);

  // Navigate after successful login
  React.useEffect(() => {
    if (isAuthenticated && type === "login") {
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/myshops");
      }, 1500);
    }
  }, [isAuthenticated, type, navigate]);

  const submit = async (data) => {
    dispatch(clearError());
    setSuccessMessage("");

    try {
      if (type === "register") {
        console.log("Registering user:", data);
        const result = await dispatch(registerUser({ 
          username: data.username, 
          password: data.password 
        })).unwrap();
        
        console.log("Registration successful:", result);
        setSuccessMessage("Account created successfully! You can now login.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        
      } else {
        console.log("Logging in user:", data);
        await dispatch(loginUser({ 
          username: data.username, 
          password: data.password 
        })).unwrap();
        
        console.log("Login successful!");
        // Navigation is handled by useEffect above
      }
    } catch (error) {
      console.error(`${type} failed:`, error);
      // Error is automatically set in Redux state
    }
  };

  return (
    <div className="bg-gradient-to-br from-clr-gray-900 via-clr-brown-900 to-clr-orange-500 bg-[length:400%_400%] animate-gradient-x min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col-reverse sm:flex-row  w-full max-w-6xl bg-clr-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side - Form */}
        <div className=" w-full sm:w-1/2 px-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="textStyleHeroHeading text-white mb-16 text-center">
              {type === "register" ? "Create Account" : "Welcome Back"}
            </h1>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
                <p className="text-green-300 text-sm">{successMessage}</p>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit(submit)}>
              <div>
                <label className="textStyleBodyMedium text-clr-brown-300 block mb-2">
                  Username
                </label>
                <Input
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="textStyleBodyMedium text-clr-brown-300 block mb-2">
                  Password
                </label>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Processing..."
                    : type === "register"
                    ? "Create Account"
                    : "Sign In"}
                </Button>
              </div>
            </form>

            <p className="textStyleRegular14 text-clr-brown-300 text-center m-4!">
              {type === "register"
                ? "Already have an account?"
                : "Don't have an account?"}
              <a
                href={type === "register" ? "/login" : "/register"}
              
                className="text-clr-orange-500 hover:text-clr-orange-600 ml-1"
              >
                {type === "register" ? "Sign in" : "Create an account"}
              </a>
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className=" h-40 sm:h-auto sm:w-1/2 relative">
          <div className="aspect-square w-full h-full">
            {type == "register" ? (
              <img
                className="w-full h-full object-cover"
                src="login-page.png"
                alt="Registration illustration"
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src="login-page-icon.png"
                alt="Login illustration"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register_login;
