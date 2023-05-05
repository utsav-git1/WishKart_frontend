import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 30px 0px;
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
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
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
  height: 100%;
  flex: 1;
`;
const Image = styled.img`
  height: 80%;
  width: 70%;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 50px;
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
      } catch (err) {
        console.log(err);
      }
    };
    getSliderData();
  }, []);

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
    </>
  );
};

export default Slider;
