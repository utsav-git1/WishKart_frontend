import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("../../public/logo.jpg");
  background-size: contain;
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
  border: none;
  border-bottom: solid 2px;
  outline: none;
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
`;

const SuccessMessage = styled.div`
  font-size: 20px;
  color: blue;
`;

const ErrorMessage = styled.div`
  font-size: 20px;
  color: red;
`;

const registerRequest = async (
  setUser,
  userInfo,
  setLoading,
  setErrorMessage
) => {
  try {
    const res = await publicRequest.post("/register", userInfo);
    setUser(res ? res.data : null);
    setErrorMessage(null);
  } catch (err) {
    setErrorMessage(
      `${Object.keys(err.response.data.keyValue)}  already exists!`
    );
    setLoading(false);
  }
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const loggedinUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(loggedinUser);

  const handleClick = (event) => {
    event.preventDefault();
    if (
      firstName.trim() == "" ||
      lastName.trim() == "" ||
      userName.trim() == "" ||
      email.trim() == "" ||
      password.trim() == "" ||
      password !== confirmPassword
    ) {
      password !== confirmPassword
        ? setErrorMessage("Passwords do not match")
        : setErrorMessage("Please fill the required fields!");
    } else {
      const userInfo = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      };

      registerRequest(setUser, userInfo, setLoading, setErrorMessage);
      setLoading(true);
    }
  };

  useEffect(() => {
    user && login(dispatch, { username: user?.userName, password: password });
    if (user) setLoading(false);
  }, [user]);

  return (
    <Container>
      <Wrapper>
        <Title>Register New User!</Title>
        <Form>
          <Input
            placeholder="First Name*"
            required={true}
            onChange={(event) => setFirstName(event.target.value)}
            style={{ borderColor: firstName.trim() == "" ? "red" : "black" }}
          />
          <Input
            placeholder="Last Name*"
            onChange={(event) => setLastName(event.target.value)}
            style={{ borderColor: lastName.trim() == "" ? "red" : "black" }}
          />
          <Input
            placeholder="User Name*"
            onChange={(event) => setUserName(event.target.value)}
            style={{ borderColor: userName.trim() == "" ? "red" : "black" }}
          />
          <Input
            placeholder="Email*"
            onChange={(event) => setEmail(event.target.value)}
            style={{ borderColor: email.trim() == "" ? "red" : "black" }}
          />
          <Input
            placeholder="Password*"
            onChange={(event) => setPassword(event.target.value)}
            style={{ borderColor: password.trim() == "" ? "red" : "black" }}
          />
          <Input
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            style={{
              borderColor: password != confirmPassword ? "red" : "black",
            }}
          />
          {/* <Button onClick={handleClick}>Create</Button> */}
          <LoadingButton
            onClick={handleClick}
            loading={loading}
            variant="outlined"
            sx={{ color: "black", background: "teal", margin: "5px" }}
          >
            Register
          </LoadingButton>
          {loggedinUser && (
            <SuccessMessage>
              You have successfully registered! Click Here to
              <b>
                <u>
                  <Link to="/login">Login</Link>
                </u>
              </b>
            </SuccessMessage>
          )}
          {!loggedinUser && errorMessage !== null && (
            <ErrorMessage>{errorMessage.toUpperCase()}</ErrorMessage>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
