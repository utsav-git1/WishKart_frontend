import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { emptyCart } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err.response.data);
    dispatch(loginFailure(err.response.data));
  }
};

export const saveWishlist = async (wishlist, user) => {
  try {
    let wishlistData = { ...wishlist };
    wishlistData.userId = user.user._id;
    wishlistData.wishlistId = wishlist.id;
    const res = await publicRequest.put(
      `/wishlist/${user?.user._id}`,
      wishlistData,
      {
        headers: {
          token: `Bearer ${user?.accessToken}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const saveCart = async (cart, user) => {
  try {
    const res = await publicRequest.put(
      `/cart/${user?.user._id}`,
      {
        userId: user?.user._id,
        products: cart.products,
        quantity: cart.quantity,
        total: cart.total,
        cartId: cart.id,
      },
      {
        headers: {
          token: `Bearer ${user?.accessToken}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const placeOrder = async (cart, user, paymentId, dispatch) => {
  let cartData = {
    products: cart.products,
    amount: cart.total,
    userId: user?.user._id,
    paymentId: paymentId,
  };
  try {
    const res = await publicRequest.post("/order", cartData, {
      headers: {
        token: `Bearer ${user.accessToken}`,
      },
    });
    setTimeout(() => {
      dispatch(emptyCart({ id: cart.id }));
    }, 3000);
  } catch (err) {
    console.log(err);
  }
};
