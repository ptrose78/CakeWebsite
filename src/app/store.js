// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import jumbotronReducer from '../features/jumbotron/jumbotronSlice';
import productReducer from '../features/productList/productListSlice';
import logoReducer from '../features/logo/logoSlice';
import dropdownMenuReducer from '../features/dropdownMenu/dropdownMenuSlice';
import cakeOrderFormReducer from '../features/cakeOrderForm/cakeOrderFormSlice';
import cupcakeOrderFormReducer from '../features/cupcakeOrderForm/cupcakeOrderFormSlice';
import orderFormVisibilityReducer from '../features/orderFormVisibility/orderFormVisibilitySlice';
import paymentFormReducer from '../features/paymentForm/paymentFormSlice';
import cartReducer from '../features/cart/cartSlice';
import checkoutReducer from '../features/checkout/checkoutSlice';
import contactFormReducer from '../features/contactForm/contactFormSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    jumbotron: jumbotronReducer,
    products: productReducer,
    logo: logoReducer,
    dropdownMenu: dropdownMenuReducer,
    cakeOrderForm: cakeOrderFormReducer,
    cupcakeOrderForm: cupcakeOrderFormReducer,
    orderFormVisibility: orderFormVisibilityReducer,
    paymentForm: paymentFormReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    contactForm: contactFormReducer
  },
});
