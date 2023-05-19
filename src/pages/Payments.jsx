import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("../../logo.jpg");
  background-size: contain;
`;

const PaymentContainer = styled.div`
  height: 50%;
  width: 25%;
  border: solid 1px lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.h1`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 600;
  font-style: italic;
  font-size: 1.8rem;
`;

const Note = styled.h2`
  font-size: large;
  color: red;
`;

const KEY =
  "pk_test_51N8n8sSGFTtsP6miEOV6c3a7sMchrR3vqOh3OtxhPYspY0nc3VpY2NxOfQftwCH1gj2SeOf4eeckaySbsYl3zpd300qysyNaZq";

const Payments = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const [payment, setPayment] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const naviate = useNavigate();
  useEffect(() => {
    const makePaymentRequest = async () => {
      try {
        const res = await publicRequest.post(
          "/payment",
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          },
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );
        res.data.id && placeOrder(cart, user, res.data.id, dispatch);
        setPayment(true);
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makePaymentRequest();
  }, [stripeToken]);

  useEffect(() => {
    payment && naviate("/success", { replace: true });
  }, [payment]);

  const token = (token) => {
    setStripeToken(token);
  };

  return (
    <>
      <Container>
        <PaymentContainer>
          <Header>Payment Methods</Header>
          <StripeCheckout
            name="WishKart"
            image="../../logo.jpg"
            billingAddress
            shippingAddress
            description={`Your Order Amount is ${cart.total} $`}
            amount={cart.total * 100}
            token={token}
            stripeKey={KEY}
          ></StripeCheckout>
        </PaymentContainer>
      </Container>

      <Note>
        Warning!
        <br/> This payment portal is under developmental progress.
        <br />
        DO NOT use your original debit/credit card / bank details.
        <br />
        Any financial losses are not covered by the author of this
        website-WishKart.
      </Note>
    </>
  );
};

export default Payments;
