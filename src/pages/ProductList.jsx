import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Container = styled.div``;

const Title = styled.h1``;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterText = styled.div`
  margin-right: 20px;
`;

const Select = styled.select`
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const Option = styled.option``;

const filteringCategory = (category) => {
  const categoryString = category.split("%20").join(" ");
  return categoryString;
};

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("latest");
  const filterOptions = useSelector((state) => state.filterData.filterData);

  let category = filteringCategory(cat);

  const filterHandler = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const sortHandler = (event) => {
    setSort(event.target.value);
  };

  return (
    <Container>
      <Navbar />
      <Title>{category === "all" ? "All Products" : category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={filterHandler}>
            <Option disabled selected>
              Color
            </Option>
            {filterOptions.color?.map((item, index) => (
              <Option key={index}>{item}</Option>
            ))}
          </Select>
          <Select name="size" onChange={filterHandler}>
            <Option disabled selected>
              Size
            </Option>
            {filterOptions.size?.map((item, index) => (
              <Option value={item} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={sortHandler}>
            <Option selected disabled>
              Sort
            </Option>
            <Option value="highToLow">Price High to Low</Option>
            <Option value="lowToHigh">Price Low to High</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
    </Container>
  );
};

export default ProductList;
