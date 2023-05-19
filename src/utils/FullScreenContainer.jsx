import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("../../logo.jpg");
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div`
  font-size: 40px;
  font-weight: bold;
  text-decoration: wavy;
  opacity: 0.7;
`;

const FullScreenContainer = ({ message }) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default FullScreenContainer;
