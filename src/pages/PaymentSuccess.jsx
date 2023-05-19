import React, { useEffect } from "react";
import styled from "styled-components";
import FullScreenContainer from "./../utils/FullScreenContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../redux/cartRedux";
import { saveCart } from "../redux/apiCalls";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  padding: 0.5%;
  width: 100px;
  height: 50px;
  margin-top: 50px;
  border: 0.5px;
  border-radius: 5px;
  background-color: lightblue;
  cursor: pointer;
`;

const PaymentSuccess = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyCart({ id: cart.id }));
  }, []);

  useEffect(() => {
    saveCart(cart, user);
  }, [cart]);

  return (
    <Container>
      <Link to="/order">
        <Button>Show Orders</Button>
      </Link>
      <FullScreenContainer message={`Your Order is Successfully Placed!`} />
    </Container>
  );
};

export default PaymentSuccess;
