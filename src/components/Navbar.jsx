import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { loadUserCartData } from "../redux/cartRedux";
import SvgIcon from "@mui/material/SvgIcon";
import { loadUserWishlist } from "../redux/wishlistRedux";
import LogoutIcon from "@mui/icons-material/Logout";
import { loginSuccess } from "../redux/userRedux";
import AlertDialog from "../utils/Dialog";

const Container = styled.div`
  height: 60px;
  margin-bottom: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: transparent;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
`;

const LogoText = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchedText, setSearchedText] = useState("");
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    setMessage("You are successfully Logged Out!");
    setWarning(true);
    dispatch(loginSuccess(null));
  };

  useEffect(() => {
    const loadUserCart = async () => {
      if (user !== null) {
        try {
          const res = await publicRequest.get(`/cart/find/${user?.user._id}`, {
            headers: {
              token: `Bearer ${user?.accessToken}`,
            },
          });
          dispatch(
            loadUserCartData({
              quantity: res.data.quantity,
              products: res.data.products,
              total: res.data.total,
              id: res.data._id,
            })
          );
        } catch (err) {
          console.log(err);
        }

        try {
          const res = await publicRequest.get(
            `/wishlist/find/${user?.user._id}`,
            {
              headers: {
                token: `Bearer ${user?.accessToken}`,
              },
            }
          );
          dispatch(
            loadUserWishlist({ products: res.data.products, id: res.data._id })
          );
        } catch (err) {
          console.log(err);
        }
      }
    };

    loadUserCart();
  }, [user]);

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input
                onChange={(event) => setSearchedText(event.target.value)}
              />
              <Link to={`/products/${searchedText}`}>
                <SearchOutlinedIcon sx={{ color: "grey", fontSize: "16px" }} />
              </Link>
            </SearchContainer>
          </Left>
          <Center>
            <Logo src="../../public/logo.jpg" />
            <LogoText>WishKart</LogoText>
          </Center>
          <Right>
            <Link to="/">
              <MenuItem>
                <HomeIcon />
              </MenuItem>
            </Link>
            {!user ? (
              <>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>Register</MenuItem>
                </Link>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>Sign In</MenuItem>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <MenuItem>
                    <LogoutIcon onClick={handleLogout} />
                  </MenuItem>
                </Link>
                <Link
                  to="/order"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>Your Orders</MenuItem>
                </Link>
                <Link
                  to="/wishlist"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>Wishlist</MenuItem>
                </Link>
              </>
            )}
            <Link to={user ? "/cart" : "/login"}>
              <MenuItem>
                <Badge badgeContent={user ? quantity : 0} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
        {warning && <AlertDialog setWarning={setWarning} message={message} />}
      </Container>
    </>
  );
};

export default Navbar;
