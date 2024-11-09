// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import jumbotronReducer from '../features/jumbotron/jumbotronSlice';
import productReducer from '../features/productList/productListSlice';
import logoReducer from '../features/logo/logoSlice';
import dropdownMenuReducer from '../features/dropdownMenu/dropdownMenuSlice';
import cakeOrderFormReducer from '../features/cakeOrderForm/cakeOrderFormSlice';
import orderFormVisibilityReducer from '../features/orderFormVisibility/orderFormVisibilitySlice';
import paymentFormReducer from '../features/paymentForm/paymentFormSlice';
import cartReducer from '../features/cart/cartSlice';


export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    jumbotron: jumbotronReducer,
    products: productReducer,
    logo: logoReducer,
    dropdownMenu: dropdownMenuReducer,
    cakeOrderForm: cakeOrderFormReducer,
    orderFormVisibility: orderFormVisibilityReducer,
    paymentForm: paymentFormReducer,
    cart: cartReducer
  },
});
