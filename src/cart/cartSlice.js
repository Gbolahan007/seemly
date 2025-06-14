import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.price;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.price;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearItem(state) {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearItem,
} = cartSlice.actions;

export default cartSlice.reducer;
