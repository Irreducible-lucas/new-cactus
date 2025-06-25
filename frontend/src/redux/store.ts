import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import authReducer from './auth/authSlice';
import authApi from './auth/authApi';
import productsApi from './features/product/productApi';
import reviewApi from './features/reviews/reviewApi';
import favoriteApi from './favorites/favoriteApi';
import orderApi from './order/orderApi'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewApi.middleware,
      favoriteApi.middleware,
      orderApi.middleware 
    ),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
