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

const SkeletonContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;

  @media screen and (min-width: 300px) and (max-width: 750px) {
    width: 200%;
  }
`;

const SkeletonImageContainer = styled.div`
  height: 90%;
  width: 90%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkeletonImage = styled.img`
  border-radius: 2%;
  height: 70%;
  width: 50%;
  min-width: 250px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
  opacity: 0.7;
`;

const SkeletonInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  top: 0;
  left: 0;
  margin: auto;
`;

const SkeletonTitle = styled.h1`
  height: 40px;
  width: 30%;
  border-radius: 5px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const SkeletonDescripton = styled.p`
  width: 20%;
  height: 30px;
  border-radius: 5px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const SkeletonButton = styled.button`
  height: 35px;
  width: 15%;
  border-radius: 5px;
  animation: ${skeletonAnimation} 1s linear infinite alternate;
`;

const SliderSkeleton = () => {
  return (
    <SkeletonContainer>
      <SkeletonImageContainer>
        <SkeletonImage></SkeletonImage>
      </SkeletonImageContainer>
      <SkeletonInfoContainer>
        <SkeletonTitle />
        <SkeletonDescripton />
        <SkeletonButton />
      </SkeletonInfoContainer>
    </SkeletonContainer>
  );
};

export default SliderSkeleton;
