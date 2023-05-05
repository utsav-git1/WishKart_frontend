import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Add, Remove } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "../utils/Dialog";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { addItem, removeItem } from "../redux/wishlistRedux";
import { saveWishlist } from "../redux/apiCalls";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  margin: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 50vh;
  width: 70%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  border-left: solid 1px lightgray;
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 50px;
`;

const Description = styled.div`
  margin: 20px 0px;
  letter-spacing: 2px;
`;

const Price = styled.div`
  font-size: 25px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 30px;
`;

const FilterTitle = styled.div`
  font-weight: 100;
  font-size: 20px;
  margin-right: 5px;
`;

const FilterColor = styled.div`
  height: 20px;
  width: 20px;
  margin: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: ${(props) => (props.selected === props.color ? `solid 2px` : `none`)};
`;

const FilterSize = styled.select`
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 200;
`;

const Amount = styled.span`
  height: 20px;
  width: 20px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  color: teal;
  font-size: 15px;
  border: 2px grey solid;
  transition: all 0.3s ease;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState("");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const wishlist = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    if (user == null) {
      setWarning(true);
      setMessage("Please Sign In to add items to Cart");
    } else {
      let cartProduct = { ...product };
      cartProduct.color = color;
      cartProduct.size = size;
      cartProduct.amount = amount;
      dispatch(
        addProduct({
          cartProduct,
          price: product.price * amount,
        })
      );
    }
  };

  useEffect(() => {
    const saveCart = async () => {
      try {
        const res = await publicRequest.put(
          `/cart/${user?.user._id}`,
          {
            userId: user?.user._id,
            products: cart.products,
            quantity: cart.quantity,
            total: cart.total,
            cartId: cart.id,
          },
          {
            headers: {
              token: `Bearer ${user?.accessToken}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    user && saveCart();
  }, [cart]);

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

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.image} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.description}</Description>
          <Price>Price: {product.price} $</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color:</FilterTitle>
              {product.color?.map((item) => (
                <FilterColor
                  color={item}
                  selected={color}
                  onClick={() => setColor(item)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(event) => setSize(event.target.value)}>
                <FilterSizeOption disabled selected>
                  Size
                </FilterSizeOption>
                {product.size?.map((item) => (
                  <FilterSizeOption value={item}>{item}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
            <Filter>
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
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              {amount > 1 && (
                <Remove onClick={() => setAmount((prev) => prev - 1)} />
              )}
              <Amount>{amount}</Amount>
              <Add onClick={() => setAmount((prev) => prev + 1)} />
            </AmountContainer>
            <Button onClick={handleClick}>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      {warning && <AlertDialog setWarning={setWarning} message={message} />}
    </Container>
  );
};

export default Product;
