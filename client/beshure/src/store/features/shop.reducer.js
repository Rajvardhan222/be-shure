import { createSlice } from "@reduxjs/toolkit";
import { createNewShop,deleteShop,getShopDetails,listShops,updateShop } from "./shops.actions.js";
import { clearError } from "./user.reducer";


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
        setShops: (state, action) => {
            state.shops = action.payload;
        },
        addShop: (state, action) => {
            state.shops.push(action.payload);
        },
        updateShop: (state, action) => {
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
    }
})