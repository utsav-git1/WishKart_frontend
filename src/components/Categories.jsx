import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4%;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async (req, res) => {
      try {
        const res = await publicRequest.get("/category");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  return (
    <Container>
      {categories.map((category, index) => (
        <CategoryItem data={category} key={index} />
      ))}
    </Container>
  );
};

export default Categories;
