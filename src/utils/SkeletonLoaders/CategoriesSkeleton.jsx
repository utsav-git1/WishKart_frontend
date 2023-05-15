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
  margin: 10px;
  position: relative;
  height: 400px;
  width: 300px;
  min-height: 400px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  border-radius: 5px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const CategoriesSkeleton = () => {
  return <Container />;
};

export default CategoriesSkeleton;
