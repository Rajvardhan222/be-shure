import { createSlice } from "@reduxjs/toolkit";
import { createNewProduct, listProducts, searchClosestProducts } from "./product.actions.js";

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        searchResults: [],
        loading: false,
        error: null
    },
    reducers: {
        clearError:(state) => {
            state.error = null;
        },
        setErrors: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNewProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(createNewProduct.rejected, (state, action) => {
                console.log("action rejected", action)
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(listProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchClosestProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchClosestProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload?.data;
            })
            .addCase(searchClosestProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

 

export const selectItems = (state) => state.product.items;
export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;
export const selectSearchResults = (state) => state.product.searchResults;

export default productSlice.reducer;