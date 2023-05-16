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
  height: 45vh;
  width: 25vw;
  margin-bottom: 100px;
  margin-left: 15px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;
const ProductTile = styled.div`
  height: 100%;
  width: 50%;
  margin: 10px;
  min-height: 230px;
  min-width: 180px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductDescription = styled.div`
  height: 10%;
  width: 50%;
  margin: 7px 30px 7px 30px;
  min-height: 40px;
  min-width: 200px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const WishlistSkeleton = () => {
  return (
    <div>
      <Container>
        <GridContainer>
          {Array(6).fill(
            <ProductInfo>
              <ProductTile></ProductTile>
              <ProductDescription></ProductDescription>
            </ProductInfo>
          )}
        </GridContainer>
      </Container>
    </div>
  );
};

export default WishlistSkeleton;
