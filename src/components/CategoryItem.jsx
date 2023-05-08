import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Divider from "@mui/material/Divider";

const Container = styled.div`
  margin: 10px;
  position: relative;
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
`;

const Info = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 2%;
  height: 90%;
  width: 90%;
  min-height: 400px;
  min-width: 200px;
  object-fit: cover;
`;

const Title = styled.h2`
  color: white;
`;

const Button = styled.button`
  border: none;
  border-radius: 5%;
  color: gray;
  background-color: white;
  cursor: pointer;
  padding: 10px;
`;

const CategoryItem = (props) => {
  const data = props.data;
  return (
    <Container>
      <Link to={`/products/${data.category}`}>
        <ImageContainer>
          <Image src={data.image} />
        </ImageContainer>
        <Info>
          <Title>{data.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
