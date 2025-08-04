import { withErrorHandler } from "../../utils/apiWrapper";
import axiosInstance from "../azure.js";

export const createNewShop = withErrorHandler(
    async (shopImage, name, description, latitude, longitude, address) => {
        console.log("API Call Parameters:", {
            shopImage: shopImage?.name || shopImage,
            name,
            description,
            latitude,
            longitude,
            address
        });

        const formData = new FormData();

        formData.append("shopImage", shopImage);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("address", address);

        // Debug FormData contents
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        const response = await axiosInstance.post("/shops/new", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    }
)

export const updateShop = withErrorHandler(
    async (shopId, shopImage, name, description, latitude, longitude, address) => {

        const formData = new FormData();

        if(shopImage) {
            formData.append("shopImage", shopImage);
        }
        if(name) {
            formData.append("name", name);
        }
        if(description) {
            formData.append("description", description);
        }
        if(latitude) {
            formData.append("latitude", latitude);
        }
        if(longitude) {
            formData.append("longitude", longitude);
        }
        if(address) {
            formData.append("address", address);
        }

        const response = await axiosInstance.put(`/shops/${shopId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    }
)

export const getShopDetails = withErrorHandler(
    async (shopId) => {
        const response = await axiosInstance.get(`/shops/${shopId}`);
        
        

        return response.data;
    }
)

export const listShops = withErrorHandler(
    async () => {
        const response = await axiosInstance.get("/shops/list-shops");
        
        return response.data;
    }
)

export const deleteShop = withErrorHandler(
    async (shopId) => {
        const response = await axiosInstance.delete(`/shops/delete/${shopId}`);
        
        return response.data;
    }
)
