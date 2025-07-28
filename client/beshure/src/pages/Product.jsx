import React from "react";
import AlertBox from "../components/people/AlertBox";
import AddProductInput from "../components/shared/AddProductInput";
import Switcher1 from "../components/shared/Switcher1";

function Product() {
return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Shop Product</h1>
                <p className="text-gray-600">Manage the product available at your shop</p>
            </div>
           
            <AlertBox whenClose={()=>  <button className="px-4 py-2 bg-clr-gray-100  rounded-lg border-2 border-transparent  hover:border-2 hover:border-black  ">
                Add a Product
            </button>}>
            
            <div className=" px-10 ">
                <h2 className="text-lg font-semibold text-gray-800 m-4">Add New Product</h2>
                <form className="space-y-4">
                    <div>
                       <AddProductInput label="Product Name" name="productName" placeholder="Enter product name" type="text" />
                    </div>
                    <div>
                        <AddProductInput label="Category" name="category" placeholder="Enter category" type="text" />
                    </div>
                    <div>
                        <AddProductInput label="Price" name="price" placeholder="Enter price" type="number" />
                    </div>

                    <div>
                        <label className="textStyleBodyMedium text-clr-brown-900 block mb-2">Availability</label>
                        <Switcher1/>
                    </div>
                    
                </form>
            </div>
            </AlertBox>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Availability</th>
                             <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Product 1</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Category 1</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$10.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Stock</span>
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                
                                <AlertBox whenClose={() => <button className="">Edit</button>}><div className=" px-10 ">
                <h2 className="text-lg font-semibold text-gray-800 m-4">Update Product</h2>
                <form className="space-y-4">
                    <div>
                       <AddProductInput label="Product Name" name="productName" placeholder="Enter product name" type="text" />
                    </div>
                    <div>
                        <AddProductInput label="Category" name="category" placeholder="Enter category" type="text" />
                    </div>
                    <div>
                        <AddProductInput label="Price" name="price" placeholder="Enter price" type="number" />
                    </div>

                    <div>
                        <label className="textStyleBodyMedium text-clr-brown-900 block mb-2">Availability</label>
                        <Switcher1/>
                    </div>
                    
                </form>
            </div>
                                </AlertBox>
                             </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Product 2</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Category 2</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$15.00</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Out of Stock</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Edit</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}

export default Product;
