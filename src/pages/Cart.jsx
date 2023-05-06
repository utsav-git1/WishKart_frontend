import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  modifyProductQuantity,
  emptyCart,
} from "../redux/cartRedux";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import FullScreenContainer from "../utils/FullScreenContainer";
import { saveCart } from "../redux/apiCalls";
import ScreenLoader from "../utils/ScreenLoader";
import AlertDialog from "../utils/Dialog";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopButton = styled.button`
  padding: 10px;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  width: 750px;
  margin-bottom: 30px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.div``;

const ProductId = styled.div``;

const ProductColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.div``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  margin: 5px;
  border: solid 1px lightgrey;
  border-radius: 11%;
  padding: 5px;
`;

const ProductPrice = styled.div``;

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [screenLoader, setScreenLoader] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = (index, product) => {
    let id = product._id;
    let total = product.price * product.amount;
    dispatch(removeProduct({ index, id, total }));
  };

  const modfityCount = (index, product, type) => {
    let id = product._id;
    type === "decrease" && product.amount === 1
      ? handleDelete(index, product)
      : dispatch(modifyProductQuantity({ index, id, type }));
  };

  const handleOrder = () => {
    let cartData = {
      products: cart.products,
      amount: cart.total,
      userId: user?.user._id,
    };

    const placeOrder = async (cartData) => {
      try {
        const res = await publicRequest.post("/order", cartData, {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        });
        setTimeout(() => {
          dispatch(emptyCart({ id: cart.id }));
        }, 3000);
        setScreenLoader(false);
      } catch (err) {
        console.log(err);
        setScreenLoader(false);
      }
    };

    placeOrder(cartData);
    setScreenLoader(true);
    setTimeout(() => {
      setMessage("Congratulations! Your Order is Successfully placed");
      setScreenLoader(false);
      setSuccessFlag(true);
    }, 3000);
  };

  useEffect(() => {
    user && cart.id && saveCart(cart, user);
  }, [cart]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Cart</Title>
        <Top>
          <Link to="/">
            <TopButton>Continue Shopping!</TopButton>
          </Link>
          {cart?.products.length > 0 && (
            <TopButton onClick={handleOrder}>Place Order</TopButton>
          )}
        </Top>
        {cart?.products.length > 0 ? (
          <Bottom>
            <Info>
              {cart.products.map((product, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>{product.title}</ProductName>
                      <ProductId>101</ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>Size:{product.size}</ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <ProductAmount>Qty: {product.amount}</ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>
                      Price: {product.price * product.amount}$
                    </ProductPrice>
                    <Count>
                      <Remove
                        onClick={() => modfityCount(index, product, "decrease")}
                      />
                      <Delete onClick={() => handleDelete(index, product)} />
                      <Add
                        onClick={() => modfityCount(index, product, "increase")}
                      />
                    </Count>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
          </Bottom>
        ) : (
          <FullScreenContainer message="Oops! Your Cart is Empty" />
        )}
      </Wrapper>
      <ScreenLoader open={screenLoader} />
      {successFlag && (
        <AlertDialog setWarning={setSuccessFlag} message={message} />
      )}
    </Container>
  );
};

export default Cart;
