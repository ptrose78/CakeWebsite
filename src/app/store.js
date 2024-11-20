// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import jumbotronReducer from '../features/jumbotron/jumbotronSlice';
import productReducer from '../features/productList/productListSlice';
import logoReducer from '../features/logo/logoSlice';
import dropdownMenuReducer from '../features/dropdownMenu/dropdownMenuSlice';
import optionsOrderFormReducer from '../features/optionsOrderForm/optionsOrderFormSlice';
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
    optionsOrderForm: optionsOrderFormReducer,
    orderFormVisibility: orderFormVisibilityReducer,
    paymentForm: paymentFormReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    contactForm: contactFormReducer
  },
});
