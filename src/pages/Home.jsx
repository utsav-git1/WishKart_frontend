import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <Divider sx={{ margin: "20px", color: "gray" }}>*~*</Divider>
      <Categories />
      <Link to="/products/all">
        <button
          style={{
            border: "none",
            borderRadius: "5px",
            width: "150px",
            padding: "15px",
            margin: "20px 11%",
            color: "grey",
            background: "lightblue",
            cursor: "pointer",
          }}
        >
          All Products
        </button>
      </Link>
      <Products />
    </div>
  );
};

export default Home;
