import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import FullScreenContainer from "../utils/FullScreenContainer";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { setFilterData } from "../redux/FilterData";
import ScreenLoader from "../utils/ScreenLoader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const ProductTile = styled.div`
  height: 100%;
  width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 30vw 40vw;
  column-gap: 180px;
  row-gap: 50px;
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productFilterData, setProductFilterData] = useState({
    color: [],
    size: [],
  });
  const [screenLoader, setScreenLoader] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = category
          ? await publicRequest.get(
              `/products?category=${category?.toLowerCase()}`
            )
          : await publicRequest.get(`/products`);
        setProducts(res.data);
        setScreenLoader(false);
      } catch (err) {
        console.log(err);
        console.log('error in prod')
        setScreenLoader(false);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((product) =>
          Object.entries(filters).every(([key, value]) =>
            product[key].includes(value)
          )
        )
      );
  }, [category, filters, products]);

  useEffect(() => {
    if (sort === "latest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "lowToHigh") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  useEffect(() => {
    let color = new Set();
    let size = new Set();
    products.map((product) => {
      product.color.map((element) => color.add(element));
      product.size.map((element) => size.add(element));
      setProductFilterData({
        color: Array.from(color),
        size: Array.from(size),
      });
    });
  }, [products]);

  useEffect(() => {
    dispatch(setFilterData(productFilterData));
  }, [productFilterData]);

  return products.length === 0 ? (
    <>
      <FullScreenContainer message={`Oops No Search Results for ${category}`} />
      <ScreenLoader open={screenLoader} />
    </>
  ) : (
    <Container>
      <GridContainer>
        {category
          ? filteredProducts.map((product, index) => (
              <ProductTile key={index}>
                <Product key={product.key} product={product} />
              </ProductTile>
            ))
          : products.slice(0, 4).map((product, index) => (
              <ProductTile key={index}>
                <Product key={product.key} product={product} />
              </ProductTile>
            ))}

        {category && filteredProducts.length === 0 && (
          <FullScreenContainer
            message={`Oops No Search Results for Applied Filters!`}
          />
        )}
      </GridContainer>
    </Container>
  );
};

export default Products;
