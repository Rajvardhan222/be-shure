import React from "react";

import MyShopCard from "../components/shops/MyShopCard";

import AlertBox from "../components/people/AlertBox";
import AddProductInput from "../components/shared/AddProductInput";
import { useForm } from "react-hook-form";
import {
  selectShopError,
  selectShops,selectShopLoading
} from "../store/features/shop.reducer.js";

import { createNewShop ,listShops} from "../store/features/shops.actions.js";
import { useDispatch, useSelector } from "react-redux";
function ShopList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  const dispatch = useDispatch();
  // const { id } = useSelector(selectUser);
  const errorsApi = useSelector(selectShopError);
  const shopsList = useSelector(selectShops);
  const isLoading = useSelector(selectShopLoading);

  const handleCloseModal = () => {
    setIsAlertOpen(false);
    // Wait for animation to complete before unmounting
    setTimeout(() => {
      setShouldRender(false);
    }, 300);
  };

  const handleOpenModal = () => {
    setIsAlertOpen(true);
    setShouldRender(true);
  };

  const fetchShopsList = async () => {
    await dispatch(listShops()).unwrap();
  }

  React.useEffect(() => {
    //fetch the shops list 

   
     fetchShopsList();
   
  },[])


  const onSubmit = async (data) => {
    console.log("This is the data before submitting the shop", data);
    console.log("Form submitted successfully!");
    // get the location coordinates of the user

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(
       async (position) => {
          const { latitude, longitude } = position.coords;


          try {
            await  dispatch(createNewShop({
            shopImage: data.shopImage[0],
            name: data.shopName,
            address: data.shopAddress,
            description: data.shopDescription,
            latitude,
            longitude,
          })).unwrap();
          fetchShopsList()
          handleCloseModal(); // Close modal on success

          } catch (error) {
            console.log(error," Error while creating shop");
          }
          

         
          console.log("User's location:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          dispatch({
            type: "shop/setError",
            payload: "Unable to retrieve your location"
          });
        },{
          enableHighAccuracy:true
        }
      );
    } else {
      /* geolocation IS NOT available */
      dispatch({ 
        type: "shop/setError", 
        payload: "Geolocation is not available on your device" 
      });

    }

    
  };

  return (
    <div className="max-w-[900px] m-auto h-screen w-screen">
      <div className="flex items-center justify-between p-4">
        <h1>My Shops</h1>

        <AlertBox
        
          isOpen={isAlertOpen}
          setIsOpen={handleOpenModal}
          onClose={handleCloseModal}
          shouldRender={shouldRender}
          formId="shop-form"
          loading={isLoading}
          whenClose={() => (
            <button className="bg-clr-gray-100 cursor-pointer  py-2  px-4 rounded-lg">
              Add a Shop
            </button>
          )}
        >
          <form
            id="shop-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4 my-5 mx-8"
          >
            <div></div>
            <h2 className="text-lg font-semibold">Add your new shop</h2>

            <div className="text-red-500 text-center py-10"> {errorsApi && errorsApi}</div>

            <div className="flex flex-col gap-y-4">
              <AddProductInput
                label="Shop Name"
                name="shopName"
                {...register("shopName", {
                  required: "Shop name is required",
                  minLength: {
                    value: 2,
                    message: "Shop name must be at least 2 characters",
                  },
                })}
                placeholder="Ambika Collections"
                type="text"
                required
                error={errors.shopName?.message}
              />

              <AddProductInput
                label="Shop Address"
                name="shopAddress"
                {...register("shopAddress", {
                  required: "Shop address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                  },
                })}
                placeholder="123 Main St, Anytown"
                type="text"
                required
                error={errors.shopAddress?.message}
              />

              <AddProductInput
                label="Shop Description"
                name="shopDescription"
                {...register("shopDescription", {
                  required: "Shop description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Description must be less than 200 characters",
                  },
                })}
                placeholder="A brief description of your shop"
                type="text"
                required
                error={errors.shopDescription?.message}
              />

              <AddProductInput
                label="Shop Image"
                name="shopImage"
                {...register("shopImage", {
                  required: "Shop image is required",
                  validate: {
                    fileType: (fileList) => {
                      if (fileList && fileList[0]) {
                        const file = fileList[0];
                        const allowedTypes = [
                          "image/jpeg",
                          "image/jpg",
                          "image/png",
                          "image/webp",
                        ];
                        return (
                          allowedTypes.includes(file.type) ||
                          "Please upload a valid image file (JPG, PNG, WEBP)"
                        );
                      }
                      return true;
                    },
                    fileSize: (fileList) => {
                      if (fileList && fileList[0]) {
                        const file = fileList[0];
                        const maxSize = 5 * 1024 * 1024; // 5MB
                        return (
                          file.size <= maxSize ||
                          "File size must be less than 5MB"
                        );
                      }
                      return true;
                    },
                  },
                })}
                placeholder="Upload an image of your shop"
                type="file"
                accept="image/*"
                required
                error={errors.shopImage?.message}
              />
            </div>
          </form>
        </AlertBox>
      </div>
      <div className="mx-6">
         

        {shopsList && shopsList.length > 0 ? (
          shopsList.map((shop) => (
            <MyShopCard key={shop.id} shop={shop} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No shops found. Please add a shop.
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopList;
