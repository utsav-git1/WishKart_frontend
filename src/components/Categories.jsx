import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { publicRequest } from "../requestMethods";
import CategoriesSkeleton from "../utils/SkeletonLoaders/CategoriesSkeleton";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4%;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);

  useEffect(() => {
    const getCategories = async (req, res) => {
      try {
        const res = await publicRequest.get("/category");
        setCategories(res.data);
        setScreenLoader(false);
      } catch (err) {
        console.log(err);
        setScreenLoader(false);
      }
    };
    getCategories();
  }, []);

  return (
    <Container>
      {screenLoader
        ? Array(3).fill(<CategoriesSkeleton />)
        : categories.map((category, index) => (
            <CategoryItem data={category} key={index} />
          ))}
    </Container>
  );
};

export default Categories;
