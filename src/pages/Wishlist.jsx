import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { removeProduct, modifyProductQuantity } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import ScreenLoader from "../utils/ScreenLoader";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Bottom = styled.div`
  margin: 50px;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  width: 750px;
  margin-bottom: 30px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.div``;

const OrderContainer = styled.div`
  margin: 50px;
`;

const Wishlist = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const wishlist = useSelector((state) => state.wishlist);
  const [wishlistData, setWishlistData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);

  useEffect(() => {
    const getAllProducts = async (req, res) => {
      try {
        const res = await publicRequest.get("/products");
        setAllProducts(res.data);
        setScreenLoader(false);
      } catch (err) {
        console.log(err);
        setScreenLoader(false);
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const wishlistedItems = allProducts?.filter((product) =>
      wishlist.products.includes(product._id)
    );
    setWishlistData(wishlistedItems);
  }, [allProducts]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Wishlist</Title>
        <Bottom>
          {wishlistData.map((item, index) => (
            <OrderContainer key={index}>
              <Info>
                <Product>
                  <ProductDetail>
                    <Image src={item.image} />
                    <Details>
                      <Link
                        to={`/product/${item._id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <ProductName>{item.title}</ProductName>
                      </Link>
                    </Details>
                  </ProductDetail>
                </Product>
              </Info>
              <Divider sx={{ color: "gray" }}></Divider>
            </OrderContainer>
          ))}
        </Bottom>
      </Wrapper>
      <ScreenLoader open={screenLoader} />
    </Container>
  );
};

export default Wishlist;
