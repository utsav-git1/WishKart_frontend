import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    id: "",
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.cartProduct);
      state.total += action.payload.price;
    },

    removeProduct: (state, action) => {
      let index = action.payload.index;
      let productId = action.payload.id;
      let remainingProducts = state.products.filter(
        (product, productIndex) => index !== productIndex
      );
      state.products = [...remainingProducts];
      state.total -= action.payload.total;
      state.quantity -= 1;
    },

    modifyProductQuantity: (state, action) => {
      let index = action.payload.index;
      let productId = action.payload.id;
      let modifiedProductList = state.products.map((product, productIndex) => {
        if (index === productIndex && productId === product._id) {
          action.payload.type === "increase"
            ? (product.amount += 1) && (state.total += product.price)
            : (product.amount -= 1) && (state.total -= product.price);
        }
        return product;
      });

      state.products = [...modifiedProductList];
    },

    loadUserCartData: (state, action) => {
      state.quantity = action.payload.quantity;
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.id = action.payload.id;
    },

    emptyCart: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
      state.id = action.payload.id;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  modifyProductQuantity,
  loadUserCartData,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
