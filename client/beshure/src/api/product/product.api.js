import { withErrorHandler } from "../../utils/apiWrapper";
import axiosInstance from "../azure";

export const createNewProduct = withErrorHandler(
    async (shopId,name,price,category,available) => {
        const response = await axiosInstance.post(`/products/new/${shopId}`, {
            name,
            price,
            category,
            available
        });

        return response.data;
    }
)


export const listProducts = withErrorHandler(
    async (shopId) => {
        const response = await axiosInstance.get(`/products/list-products/${shopId}`);

        return response.data;
    }
)

export const searchClosestProducts = withErrorHandler(

    async (productName, latitude, longitude) => {
        const response = await axiosInstance.get(`/products/search`, {
            params: {
                productName,
                latitude,
                longitude
            }
        });

        return response.data;
    }
)