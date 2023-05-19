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
  @media screen and (min-width: 100px) and (max-width: 780px) {
    height: 400px;
    width: 600px;
  }

  height: 50vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  flex: 1;
  height: 100%;
  width: 40%;
  margin: 5%;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductDetails = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
`;

const ProductTitle = styled.div`
  height: 8%;
  width: 50%;
  margin: 7px 30px 7px 30px;
  min-height: 20px;
  min-width: 100px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductDescription = styled.div`
  height: 8%;
  width: 30%;
  margin: 7px 30px 7px 30px;
  min-height: 20px;
  min-width: 80px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductPrice = styled.div`
  height: 8%;
  width: 35%;
  margin: 7px 30px 7px 30px;
  min-height: 20px;
  min-width: 85px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductSize = styled.div`
  height: 8%;
  width: 45%;
  margin: 7px 30px 7px 30px;
  min-height: 20px;
  min-width: 100px;
  border-radius: 10px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const ProductSkeleton = () => {
  return (
    <div>
      <Container>
        <Image />
        <ProductDetails>
        <ProductTitle />
          <ProductDescription />
          <ProductPrice />
          <ProductSize />
        </ProductDetails>
      </Container>
    </div>
  );
};

export default ProductSkeleton;
