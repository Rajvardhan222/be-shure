import {createAsyncThunk} from '@reduxjs/toolkit';

import {createNewShop as createNewShopApi ,deleteShop as deleteShopApi,getShopDetails as getShopDetailsApi,listShops as listShopsApi,updateShop as updateShopApi} from "../../api/shops/shops.api.js"

export const createNewShop = createAsyncThunk(
    'shops/createNewShop',
    async ({shopImage, name, description, latitude, longitude, address}, {rejectWithValue}) => {

        try {
            const response = await createNewShopApi({shopImage, name, description, latitude, longitude, address});

            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create new shop');
        }
    })

export const updateShop = createAsyncThunk(
    'shops/updateShop',
    async ({shopId, shopImage, name, description, latitude, longitude, address}, {rejectWithValue}) => {
        try {
            const response = await updateShopApi(shopId, shopImage, name, description, latitude, longitude, address);

            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update shop');
        }
    }
);

export const getShopDetails = createAsyncThunk(
    'shops/getShopDetails',
    async (shopId, {rejectWithValue}) => {
        try {
            const response = await getShopDetailsApi(shopId);

            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to get shop details');
        }
    }
);

export const listShops = createAsyncThunk(
    'shops/listShops',
    async (_, {rejectWithValue}) => {
        try {
            const response = await listShopsApi();

            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to list shops');
        }
    }
);

export const deleteShop = createAsyncThunk(
    'shops/deleteShop',
    async (shopId, {rejectWithValue}) => {
        try {
            const response = await deleteShopApi(shopId);

            if (response.error) {
                return rejectWithValue(response.error);
            }
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete shop');
        }
    }
);
