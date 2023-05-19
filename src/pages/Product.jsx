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
import ProductSkeleton from "../utils/SkeletonLoaders/ProductSkeleton";

const Container = styled.div`
  @media screen and (min-width: 100px) and (max-width: 780px) {
    height: 400px;
    width: 600px;
  }

  height: 50vh;
  width: 50vw;
`;

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
  height: 100%;
  width: 90%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 5%;
  border-left: solid 1px lightgray;
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 150%;
`;

const Description = styled.div`
  margin: 5% 0px;
  letter-spacing: 2px;
  font-size: 100%;
`;

const Price = styled.div`
  font-size: 120%;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 5% 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 30%;
`;

const FilterTitle = styled.div`
  font-weight: 100;
  font-size: 100%;
  margin-right: 5%;
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
  padding: 3%;
  margin: 2%;
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
  padding: 5%;
  border-radius: 5px;
  background-color: white;
  width: 120px;
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
  const [screenLoader, setScreenLoader] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
        setScreenLoader(false);
      } catch (err) {
        setScreenLoader(false);
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    if (user == null) {
      setWarning(true);
      setMessage("Please Sign In to add items to Cart");
    } else if (size == "") {
      setWarning(true);
      setMessage("Please Select a Size!");
    } else if (color == "") {
      setWarning(true);
      setMessage("Please Select a Color!");
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
    <>
      <Container>
        <Navbar />
        {screenLoader ? (
          <ProductSkeleton />
        ) : (
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
        )}
        {warning && <AlertDialog setWarning={setWarning} message={message} />}
      </Container>
    </>
  );
};

export default Product;
