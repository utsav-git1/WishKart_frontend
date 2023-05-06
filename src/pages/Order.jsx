import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, modifyProductQuantity } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import Divider from "@mui/material/Divider";
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

const TopButton = styled.button`
  padding: 10px;
  cursor: pointer;
`;

const TopText = styled.span`
  margin: 15px 0px;
  border: solid 1px gray;
  border-radius: 5px;
  padding: 3px;
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

const ProductColor = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.div``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  margin: 5px;
  border: solid 1px lightgrey;
  border-radius: 11%;
  padding: 5px;
`;

const ProductPrice = styled.div``;

const OrderContainer = styled.div`
  margin: 50px;
`;

const Order = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [orderData, setOrderData] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);

  const getOrderList = async () => {
    try {
      const res = await publicRequest.get(`/order/${user?.user._id}`, {
        headers: {
          token: `Bearer ${user?.accessToken}`,
        },
      });
      setOrderData(res.data.reverse());
      setScreenLoader(false);
    } catch (err) {
      console.log(err);
      setScreenLoader(false);
    }
  };

  useEffect(() => {
    user && getOrderList();
  }, []);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Your Orders</Title>
        <Top>
          <TopButton onClick={getOrderList}>All Orders</TopButton>
        </Top>
        <Bottom>
          {orderData.map((order, index) => (
            <OrderContainer key={index}>
              <Info>
                <Top>
                  <TopText>Order Id: {order._id}</TopText>
                </Top>
                {order.products.map((product, index) => (
                  <Product key={index}>
                    <ProductDetail>
                      <Image src={product.image} />
                      <Details>
                        <ProductName>{product.title}</ProductName>
                        <ProductColor color={product.color} />
                        <ProductSize>Size:{product.size}</ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>Qty: {product.amount}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>
                        Price: {product.price * product.amount}$
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                ))}
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

export default Order;
