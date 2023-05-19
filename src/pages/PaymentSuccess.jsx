import React from "react";
import styled from "styled-components";
import FullScreenContainer from "./../utils/FullScreenContainer";
import { Link } from "react-router-dom";

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
  return (
    <Container>
      <Link to="/order">
        <Button>Show Orders</Button>
      </Link>
      <FullScreenContainer message={`Your Order is Succefully Placed!`} />
    </Container>
  );
};

export default PaymentSuccess;
