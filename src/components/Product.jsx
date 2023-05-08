import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from "react-router-dom";
import AlertDialog from "../utils/Dialog";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { addItem, removeItem } from "../redux/wishlistRedux";
import { saveCart, saveWishlist } from "../redux/apiCalls";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  position: relative;
  margin: 3px;
  height: 50vh;
  width: 30vw;
  margin: 00px;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  width: 80%;
  min-height: 400px;
  min-width: 300px;
`;

const Icon = styled.div`
  max-width: 40px;
  max-height: 40px;
  max-width: 40px;
  min-height: 40px;
  width: 15%;
  height: 15%;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: lightblue;
    transform: scale(1.1);
  }
`;

const Title = styled.div`
  font-size: 150%;
  text-align: center;
  margin-top: 5px;
`;

const Product = ({ product }) => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState("");

  const handleRemoveItem = (id) => {
    if (user == null) {
      setWarning(true);
      setMessage("Please Sign In to add items to Wishlist");
    } else {
      dispatch(removeItem({ productId: id }));
    }
  };

  const handleAddItem = (id) => {
    if (user == null) {
      setWarning(true);
      setMessage("Please Sign In to add items to Wishlist");
    } else {
      dispatch(addItem({ productId: id }));
    }
  };

  useEffect(() => {
    user && wishlist.id && saveWishlist(wishlist, user);
  }, [wishlist]);

  useEffect(() => {
    user && cart.id && saveCart(cart, user);
  }, [cart]);

  const handleClickCart = () => {
    if (user == null) {
      setWarning(true);
      setMessage("Please Sign In to add items to Cart");
    } else {
      let cartProduct = { ...product };
      cartProduct.color = cartProduct.color[0];
      cartProduct.size = cartProduct.size[0];
      cartProduct.amount = 1;
      dispatch(
        addProduct({
          cartProduct,
          price: cartProduct.price,
        })
      );
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={product.image} />
      </ImageContainer>
      <Info>
        <Icon>
          <ShoppingCartOutlinedIcon onClick={handleClickCart} />
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`}>
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          {wishlist.products?.includes(product._id) ? (
            <FavoriteOutlinedIcon
              onClick={() => handleRemoveItem(product._id)}
              sx={{ color: "red" }}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              onClick={() => handleAddItem(product._id)}
            />
          )}
        </Icon>
      </Info>
      <Title>{product.title}</Title>
      {warning && <AlertDialog setWarning={setWarning} message={message} />}
    </Container>
  );
};

export default Product;
