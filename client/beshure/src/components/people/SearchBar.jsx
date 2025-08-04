import React from "react";

function SearchBar({ register, handleSubmit, onSubmit, loading , errors, clearErrors }) {

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between bg-clr-white-off px-4 py-1 rounded-lg gap-x-2 flex-wrap gap-2">
        <div className="flex items-center space-x-2 flex-1">
          <img src="search.svg" alt="search icon" />
          <input
            type="text"
            className={`flex-auto outline-none text-clr-gray-800 p-2 textStyleBody ${
              errors?.search ? "border-b border-red-500" : ""
            }`}
            placeholder="Search..."
            onFocus={() => errors?.search && clearErrors && clearErrors("search")}
            {...register("search", {
              required: true,
              minLength: 2,
              maxLength: 50,
            })}
          />
        </div>
        <button
          className={`bg-clr-orange-500 text-white py-1 my-1 font-semibold flex-auto sm:flex-none px-4 rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {/* Error message display */}
      {errors?.search && (
        <div className="text-red-500 text-xs mt-1 px-4">
          {/* Debug: Show what's in the error object */}
          {console.log("Search errors:", errors.search)}
          {errors.search.type === "required" && "Search term is required"}
          {errors.search.type === "minLength" && "Search term must be at least 2 characters"}
          {errors.search.type === "maxLength" && "Search term cannot exceed 50 characters"}
          {errors.search.type === "pattern" && "Invalid search format"}
          {/* Fallback for any other error types */}
          {errors.search.message && !["required", "minLength", "maxLength", "pattern"].includes(errors.search.type) && errors.search.message}
          {/* If no specific message, show generic error */}
          {!errors.search.message && !errors.search.type && "Invalid search input"}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
