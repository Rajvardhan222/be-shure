import { createAsyncThunk } from "@reduxjs/toolkit";

import {createNewProduct as createNewProductApi,listProducts as listProductsApi,searchClosestProducts as searchClosestProductsApi} from "../../api/product/product.api.js"


export const createNewProduct = createAsyncThunk(
    'products/createNewProduct',
    async ({shopId, name, category, price, availability}, {rejectWithValue}) => {
        try {
            const response = await createNewProductApi(shopId, name,
                 price, category, availability);

            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create new product');
        }
    }
);

export const listProducts = createAsyncThunk(
    'products/listProducts',
    async (shopId, { rejectWithValue }) => {
        try {
            const response = await listProductsApi(shopId);
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to list products');
        }
    }
)

export const searchClosestProducts = createAsyncThunk(
    'products/searchClosestProducts',
    async ({ productName, latitude, longitude }, { rejectWithValue }) => {
        try {
            const response = await searchClosestProductsApi(productName, latitude, longitude);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to search closest products');
        }
    }
);