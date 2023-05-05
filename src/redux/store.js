import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import wishlistReducer from "./wishlistRedux";
import filterDataReducer from "./FilterData";

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    filterData: filterDataReducer,
  },
});
