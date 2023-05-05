import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    id: "",
  },
  reducers: {
    addItem: (state, action) => {
      state.products.push(action.payload.productId);
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (id) => id != action.payload.productId
      );
    },

    loadUserWishlist: (state, action) => {
      state.products = action.payload.products;
      state.id = action.payload.id;
    },
  },
});

export const { addItem, removeItem, loadUserWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
