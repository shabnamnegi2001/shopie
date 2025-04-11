import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StoreContext from "./context";
import Cart from "./pages/Cart";
import { useNavigate, Navigate } from "react-router";
import Toast from "./components/Toast";

const ProtectedRoute = () => {
  const navigator = useNavigate();

  return localStorage.getItem("access_token") ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="*" element={<Navigate replace to='/login' />} ></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

function App() {
  const cartState = React.useState([]);

  const toast = React.useState([
    // {type : 'info', content :  'fuck'}, {type : 'error' , content : 'you'}
  ])

  return (
    <StoreContext.Provider value={{ cartState: cartState, toastState : toast }}>
      <BrowserRouter>
        <ProtectedRoute />
      </BrowserRouter>
      <Toast  />
    </StoreContext.Provider>
  );
}

export default App;
