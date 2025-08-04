import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {selectError,selectLoading} from "../../store/features/product.reducer.js"
import {
  createNewProduct,
  listProducts,

} from "../../store/features/product.actions.js";
import AddProductInput from './AddProductInput.jsx';
import Switcher1 from './Switcher1.jsx';
function CreateOrEditProduct({productName, category, price, availability,update,fetchProducts,handleCloseModal,formId}) {
    const {register, handleSubmit, formState: { errors }, control, reset} = useForm({
        defaultValues: {
            productName: productName || "",
            category: category || "",
            price: price || 0,
            availability: availability || true,
        }
    });
  const shopId = window.location.pathname.split("/").pop();
    const addOrUpdateProduct = async(data) => {
        if(update) {
            //TODO create update product api 
        }
        else {
             console.log("Form Data:", data);
            
                try {
                  // TODO: Add your API call here
                  // await dispatch(createProduct(data)).unwrap();
            
                  console.log("Product added successfully!");
            
                  try {
                    await dispatch(
                      createNewProduct({
                        shopId,
                        name: data.productName,
                        category: data.category,
                        price: data.price,
                        availability: data.availability,
                      })
                    ).unwrap();
                    fetchProducts();
            
                    reset(); // Reset form after successful submission
                    handleCloseModal(); // Close modal on success
                  } catch (error) {
                    console.error("Error creating product:", error);
                    // Handle error here, e.g., show a notification
                  }
                } catch (error) {
                  console.error("Error adding product:", error);
                  // Handle error here
                }
        }
    }

    const dispatch = useDispatch();
    const error = useSelector(selectError);
    
  return (
    <div className="px-10 ">
            <div className="text-red-500 text-center py-10">
              {error && error}
            </div>

            <h2 className="text-lg font-semibold text-gray-800 m-4">
              Add New Product
            </h2>
            <form
              id={formId}
              onSubmit={handleSubmit(addOrUpdateProduct)}
              className="space-y-4 overflow-y-scroll"
            >
              <div className="flex flex-col gap-y-4">
                <AddProductInput
                  label="Product Name"
                  name="productName"
                  {...register("productName", {
                    required: "Product name is required",
                    minLength: {
                      value: 2,
                      message: "Product name must be at least 2 characters",
                    },
                  })}
                  placeholder="AMUL Milk"
                  type="text"
                  required
                  error={errors.productName?.message}
                />
              </div>
              <div>
                <AddProductInput
                  label="Category"
                  name="category"
                  required
                  placeholder="Enter category"
                  type="text"
                  {...register("category", {
                    required: "Category is required",
                    minLength: {
                      value: 2,
                      message: "Category must be at least 2 characters",
                    },
                  })}
                  error={errors.category?.message}
                />
              </div>
              <div>
                <AddProductInput
                  label="Price"
                  name="price"
                  required
                  placeholder="Enter price"
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be a positive number",
                    },
                  })}
                  error={errors.price?.message}
                />
              </div>

              <div>
                <label className="textStyleBodyMedium text-clr-brown-900 block mb-2">
                  Availability
                </label>
                <Controller
                  name="availability"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Switcher1 name={name} value={value} onChange={onChange} />
                  )}
                />
              </div>
            </form>
          </div>
  )
}

export default CreateOrEditProduct