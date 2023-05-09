import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("../../public/logo.jpg");

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 20%;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 50;
  margin-bottom: 10px;
`;

const Form = styled.form``;

const Input = styled.input`
  margin: 5px;
  padding: 5px;
`;

const Error = styled.div`
  color: red;
  margin: 5px;
`;

const Register = styled.div`
  color: blue;
  text-decoration: underline;
  font-size: 15px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, response } = useSelector((state) => state.user);

  const handleClick = (event) => {
    event.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In!</Title>
        <Form>
          <Input
            placeholder="User Name"
            onChange={() => setUsername(event.target.value)}
          />
          <Input
            placeholder="Password"
            password
            onChange={() => setPassword(event.target.value)}
          />
          <LoadingButton
            loading={isFetching}
            onClick={handleClick}
            variant="outlined"
            sx={{ color: "black", background: "teal", margin: "5px" }}
          >
            Login
          </LoadingButton>
          {error && <Error>{response}</Error>}
          <Link to="/register">
            <Register>New User! Click to Register</Register>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
