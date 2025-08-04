import { createSlice } from "@reduxjs/toolkit";
import { createNewShop,deleteShop,getShopDetails,listShops,updateShop } from "./shops.actions.js";



const initialState = {
    shops: [],
    loading: false,
    error: null,
    
}

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setShops: (state, action) => {
            state.shops = action.payload;
        },
        addShop: (state, action) => {
            state.shops.push(action.payload);
        },
        updateShopDetail: (state, action) => {
            const index = state.shops.findIndex(shop => shop.id === action.payload.id);
            if (index !== -1) {
                state.shops[index] = action.payload;
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(createNewShop.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createNewShop.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.shops.push(action.payload);
        })
        .addCase(createNewShop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(listShops.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(listShops.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            
            state.shops =action.payload?.data;
        })
        .addCase(listShops.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getShopDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getShopDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.shops = state.shops.map(shop =>
                shop.id === action.payload.id ? action.payload : shop
            );
        })
        .addCase(getShopDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(updateShop.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateShop.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const index = state.shops.findIndex(shop => shop.id === action.payload.id);
            if (index !== -1) {
                state.shops[index] = action.payload;
            }
        })
        .addCase(updateShop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteShop.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteShop.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.shops = state.shops.filter(shop => shop.id !== action.payload.id);
        })
        .addCase(deleteShop.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const { clearError, setShops, addShop, updateShopDetail } = shopSlice.actions;
export const selectShops = (state) => state.shop.shops;
export const selectShopLoading = (state) => state.shop.loading;
export const selectShopError = (state) => state.shop.error;

export default shopSlice.reducer;