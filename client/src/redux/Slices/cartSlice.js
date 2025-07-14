// redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.bookId === product.bookId
      );

      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        state.cartItems.push(product);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.bookId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
