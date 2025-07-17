import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/Slices/userSlice";
import bookSlice from "../redux/Slices/bookSlice";
import themeSlice from "../redux/Slices/themeSlice";
import blogSlice from "../redux/Slices/blogSlice";
import authSlice from "../redux/Slices/authSlice";
import contactSlice from "../redux/Slices/contactSlice";
import cartSlice from "../redux/Slices/cartSlice";
import orderSlice from "../redux/Slices/orderSlice";
import categorySlice from "../redux/Slices/categorySlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    book: bookSlice,
    theme: themeSlice,
    blog: blogSlice,
    contact: contactSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    category: categorySlice,
  },
});
