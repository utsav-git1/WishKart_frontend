import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import ScreenLoader from "../utils/ScreenLoader";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;

  @media screen and (min-width: 300px) and (max-width: 750px) {
    width: 200%;
  }
  
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: lightgrey;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.7;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slide * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

const ImageContainer = styled.div`
  height: 90%;
  width: 90%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 2%;
  height: 70%;
  width: 50%;
  min-width: 250px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 200%;
`;

const Description = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
`;

const Slider = () => {
  const [slide, setSlide] = useState(0);
  const [data, setData] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);

  const handleClick = (direction) => {
    if (direction === "left") setSlide(slide > 0 ? slide - 1 : 2);
    else setSlide(slide < 2 ? slide + 1 : 0);
  };

  useEffect(() => {
    const getSliderData = async (req, res) => {
      let random = Math.ceil(Math.random() * 1000);
      try {
        const response =
          random % 2
            ? await publicRequest.get("/products")
            : await publicRequest.get("/category");
        setData(response.data);
        setScreenLoader(false);
      } catch (err) {
        console.log(err);
        setScreenLoader(false);
      }
    };
    getSliderData();
  }, []);

  useEffect(() => {
    data.length === 0 ? setScreenLoader(true) : setScreenLoader(false);
  }, [data]);

  return (
    <>
      <Container>
        <Wrapper slide={slide}>
          {data.slice(0, 3).map((data, index) => (
            <Slide bg="white" key={index}>
              <ImageContainer>
                <Image src={data?.image} />
              </ImageContainer>
              <InfoContainer>
                <Title>{data?.title} Sale !!!</Title>
                <Description>{data?.description} sale is live</Description>
                <Link
                  to={`/products/${data?.categories?.[0] ?? data?.category}`}
                >
                  <Button>Shop Now</Button>
                </Link>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlinedIcon />
        </Arrow>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlinedIcon />
        </Arrow>
      </Container>
      <ScreenLoader open={screenLoader} />
    </>
  );
};

export default Slider;
