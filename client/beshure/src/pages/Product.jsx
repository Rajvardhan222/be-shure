import React, { useEffect } from "react";
import AlertBox from "../components/people/AlertBox";
import AddProductInput from "../components/shared/AddProductInput";
import Switcher1 from "../components/shared/Switcher1";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectError,
  selectItems,
  selectLoading,
} from "../store/features/product.reducer.js";
import {
  createNewProduct,
  listProducts,
} from "../store/features/product.actions.js";
import CreateOrEditProduct from "../components/shared/EditProduct.jsx";
function Product() {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);
  
  // Separate state for edit modal
  const [editingProductId, setEditingProductId] = React.useState(null);
  const [editingProduct, setEditingProduct] = React.useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      productName: "",
      category: "",
      price: "",
      availability: false,
    },
  });
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const items = useSelector(selectItems);

  const handleCloseModal = () => {
    setIsAlertOpen(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 300);
    reset(); // Reset form when closing modal
  };
  
  const handleOpenModal = () => {
    setIsAlertOpen(true);
    setShouldRender(true);
  };

  // Handlers for edit modal
  const handleCloseEditModal = () => {
    setEditingProductId(null);
    setEditingProduct(null);
  };
  
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setEditingProductId(product.id);
  };
  const shopId = window.location.pathname.split("/").pop();

  const addOrUpdateProduct = async (data) => {
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
  };

  const fetchProducts = async () => {
    try {
      await dispatch(listProducts(shopId)).unwrap();
      console.log("Products fetched successfully!");
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error here, e.g., show a notification
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shop Product</h1>
          <p className="text-gray-600">
            Manage the product available at your shop
          </p>
        </div>

        <AlertBox
          whenClose={() => (
            <button
              className="px-4 py-2 bg-clr-gray-100
            hover:scale-110
            rounded-lg border-2 border-transparent transition-all active:scale-90  hover:border-2  "
            >
              Add a Product
            </button>
          )}
          loading={loading}
          isOpen={isAlertOpen}
          setIsOpen={handleOpenModal}
          onClose={handleCloseModal}
          shouldRender={shouldRender}
          formId="add-product-form"
        >
         
          <CreateOrEditProduct
            fetchProducts={fetchProducts}
            handleCloseModal={handleCloseModal}
            formId="add-product-form"
          />
        </AlertBox>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((item, index) => {
                return (
                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                          item.available
                            ? "text-green-800 bg-green-100"
                            : "text-red-800 bg-red-100"
                        }`}
                      >
                        {item.available ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <AlertBox
                        whenClose={() => <button className="cursor-pointer font-bold">Edit</button>}
                        loading={loading}
                        isOpen={editingProductId === item.id}
                        setIsOpen={() => handleOpenEditModal(item)}
                        onClose={handleCloseEditModal}
                        shouldRender={editingProductId === item.id}
                        formId={`update-product-form-${item.id}`}
                      >
                        <CreateOrEditProduct
                          fetchProducts={fetchProducts}
                          handleCloseModal={handleCloseEditModal}
                          productName={editingProduct?.name}
                          category={editingProduct?.category}
                          price={editingProduct?.price}
                          availability={editingProduct?.available}
                          update={true}
                          formId={`update-product-form-${item.id}`}
                        />
                      </AlertBox>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
