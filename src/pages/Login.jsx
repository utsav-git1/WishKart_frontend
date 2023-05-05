import React, { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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

const Button = styled.button`
  height: 30px;
  width: 100px;
  margin: 20px 5px;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:disabled {
    color: white;
    background-color: grey;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: red;
`;

const Register = styled.div`
  color: blue;
  text-decoration: underline;
  font-size: 15px;
`;

const Loader = styled.div`
  height: 40px;
  width: 100px;
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
            placeholder="Password" password
            onChange={() => setPassword(event.target.value)}
          />
          {error && <Error>{response}</Error>}
          <Loader>
            {isFetching && <CircularProgress color="secondary" />}
          </Loader>
          <Button onClick={handleClick} disabled={isFetching}>
            Login
          </Button>
          <Link to="/register">
            <Register>New User! Click to Register</Register>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
