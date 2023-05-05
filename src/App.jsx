import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Order from "./pages/Order";
import Wishlist from "./pages/Wishlist";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
