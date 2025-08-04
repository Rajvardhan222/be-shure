import React, { useState } from 'react'
import SearchBar from '../components/people/SearchBar'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { searchClosestProducts } from '../store/features/product.actions.js'
import {
  selectError,
  selectSearchResults
} from '../store/features/product.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

function Search() {
  // Modern React Router way to get search params
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('s') || '';

  // Local loading state for search
  const [isSearching, setIsSearching] = useState(false);

  // Move form state here
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      search: searchQuery,
    },
  });

  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);
  const error = useSelector(selectError);

  // Watch the search field to get real-time value
  const currentSearchValue = watch('search');

  const onSubmit = async (data) => {
    console.log(data);
    setIsSearching(true); // Start local loading
    
    //get the location of the user same way as in the create shop page

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          console.log("User's location:", latitude, longitude);

          try {
            await dispatch(
              searchClosestProducts({
                productName: data.search,
                latitude,
                longitude,
              })
            ).unwrap();
          } catch (error) {
            dispatch({
              type: "products/setErrors",
              payload: error.message || "Failed to search products",
            });
          } finally {
            setIsSearching(false); // Stop local loading
          }
        },
        (error) => {
          dispatch({
            type: "products/setErrors",
            payload: error.message || "Failed to retrieve location",
          });
          setIsSearching(false); // Stop local loading on error
        }
      );
    } else {
      /* geolocation IS NOT available */
      dispatch({
        type: "products/setErrors",
        payload: "Geolocation is not available on your device",
      });
      setIsSearching(false); // Stop local loading
    }
  };

  return (
    <div className=' max-w-[1000px] m-auto bg-white h-screen w-screen py-4 px-6'>
        <SearchBar
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={isSearching} // Use local loading state instead of Redux loading
        />
      { currentSearchValue !== '' && <h1 className='mt-5 text-xl '>
          {currentSearchValue ? `Shops that sell '${currentSearchValue}'` : 'Search Results'}
        </h1>}

        {/* Display search results */}
        {isSearching && <p>Searching...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        
        {/* Show "No results found" when search is complete, no error, and no results */}
        {!isSearching && !error && searchResults && searchResults.length === 0 && currentSearchValue !== '' && (
          <p className="mt-4 text-gray-600">No results found for '{currentSearchValue}'</p>
        )}
        
        {!isSearching&&searchResults && searchResults.length > 0 && (
          <div className="mt-4">
            {searchResults.map((product, index) => (
              <div key={index} className='flex items-center justify-between bg-gray-100 p-4 rounded-lg mt-4'>
                <div className='flex flex-col gap-y-4'>
                  <p className='textStyleBodyMedium'>{product.shop?.name || 'Unknown Shop'}</p>
                  <p className='textStyleRegular14 text-clr-brown-500'>{product.shop?.address || 'Address not available'}</p>
                  <p className='text-sm text-gray-600'>Product: {product.name} - ${product.price}</p>
                </div>
                <div className='textStyleBodyMedium cursor-pointer'
                onClick={() => {
                  const shop = product.shop;
                  if (!shop) {
                    alert('Shop information is not available.');
                    return;
                  }
                  
                  // Try different possible locations for coordinates
                  if (shop.latitude && shop.longitude) {
                    window.open(`https://www.google.com/maps?q=${shop.latitude},${shop.longitude}`, '_blank');
                  } else if (shop.location?.lat && shop.location?.lng) {
                    window.open(`https://www.google.com/maps?q=${shop.location.lat},${shop.location.lng}`, '_blank');
                  } else if (shop.coordinates?.latitude && shop.coordinates?.longitude) {
                    window.open(`https://www.google.com/maps?q=${shop.coordinates.latitude},${shop.coordinates.longitude}`, '_blank');
                  } else if (shop.address) {
                    // Fall back to address if coordinates aren't available
                    window.open(`https://www.google.com/maps?q=${encodeURIComponent(shop.address)}`, '_blank');
                  } else {
                    alert('Shop location information is not available.');
                  }
                }}
                >View on Map</div>
              </div>
            ))}
          </div>
        )}

        

     
    </div>
  )
}

export default Search