import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Divider from "@mui/material/Divider";

const Container = styled.div`
  margin: 3px;
  position: relative;
  height: 600px;
  width: 600px;
  padding: 0px 30px;
`;

const Info = styled.div`
  width: 70%;
  height: 70%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 70%;
  width: 70%;
  object-fit: cover;
`;

const Title = styled.h2`
  color: white;
`;

const Button = styled.button`
  border: none;
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
        <Image src={data.image} />
        <Info>
          <Title>{data.title}</Title>
          <Button>Shop Now</Button>
        </Info>
      </Link>
      <Divider sx={{ margin: "10px 0px", width: "70%", color: "gray" }}>
        *~*
      </Divider>
    </Container>
  );
};

export default CategoryItem;
