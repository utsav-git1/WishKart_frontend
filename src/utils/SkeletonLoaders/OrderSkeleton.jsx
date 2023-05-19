import React from "react";
import styled, { keyframes } from "styled-components";

const skeletonAnimation = keyframes`
0% {
  background-color: hsl(200, 20%, 70%);
}

100% {
  background-color: hsl(200, 20%, 95%);
}
`;

const Container = styled.div`
  height: 42vh;
  width: 22vw;
  margin-bottom: 100px;
  margin-left: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;
const ProductTile = styled.div`
  height: 100%;
  width: 50%;
  margin: 30px;
  min-height: 220px;
  min-width: 170px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductDescription = styled.div`
  height: 10%;
  width: 50%;
  margin: 7px 30px 7px 30px;
  min-height: 30px;
  min-width: 200px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductColor = styled.div`
  height: 30px;
  width: 30px;
  margin: 7px 30px 7px 30px;
  border-radius: 50%;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductSize = styled.div`
  height: 10%;
  width: 30%;
  margin: 7px 30px 7px 30px;
  border-radius: 10px;
  min-height: 30px;
  min-width: 50px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
  margin-bottom: 150px;
`;

const ProductDetails = styled.p`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const OrderId = styled.p`
  height: 10%;
  width: 70%;
  margin: 80px 30px 7px 30px;
  min-height: 40px;
  min-width: 200px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const OrderSkeleton = () => {
  return (
    <div>
      <Container>
        <GridContainer>
          {Array(6).fill(
            <>
              <OrderId></OrderId>
              <ProductInfo>
                <ProductTile></ProductTile>
                <ProductDetails>
                  <ProductDescription></ProductDescription>
                  <ProductColor></ProductColor>
                  <ProductSize></ProductSize>
                </ProductDetails>
              </ProductInfo>
            </>
          )}
        </GridContainer>
      </Container>
    </div>
  );
};

export default OrderSkeleton;
