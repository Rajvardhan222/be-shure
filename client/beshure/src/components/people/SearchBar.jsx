import React from "react";

function SearchBar({ register, handleSubmit, onSubmit, loading }) {
  return (
    <div className="flex items-center justify-between bg-clr-white-off px-4 py-1 rounded-lg gap-x-2 flex-wrap gap-2">
      <div className="flex items-center space-x-2  ">
        <img src="search.svg" alt="search icon" />
        <input
          type="text"
          className="flex-auto outline-none text-clr-gray-800 p-2 textStyleBody"
          placeholder="Search..."
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
  );
}

export default SearchBar;
