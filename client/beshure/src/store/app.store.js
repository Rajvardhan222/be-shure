import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user.reducer.js';
import shopReducer from './features/shop.reducer.js';
import productReducer from './features/product.reducer.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
  },
});
