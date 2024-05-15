/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserGoogleAuthentication from "../src/components/FormValidation/GoogleAuth/UserGoogleAuthentication";
import SignUp from "./components/FormValidation/userSignUp/SignUp";
import Login from "./components/FormValidation/userLogin/Login";
import HomePage from "./components/HomePage/HomePage";
import Contact from "./components/HomePage/pages/Contact";
import PageNotFound from "./components/HomePage/pages/PageNotFound";
import BlogPage from "./components/HomePage/pages/BlogPage";
import Profile from "./components/HomePage/userProfile/Profile";
import NavBar from "./components/HomePage/Navbar/NavBar";
import UserProduct from "./components/HomePage/ProductPage/UserProduct";
import Footer from "./components/HomePage/pages/Footer";
import Dashboard from "./components/HomePage/pages/Dashboard";
import Admin from "./components/HomePage/pages/Admin";
import AddToCart from "./components/HomePage/pages/AddToCart/AddToCart";

const App = () => {
  return (
    <section className="w-full h-auto bg-[#036016] flex flex-col justify-center items-center">
      <Router>
        <UserGoogleAuthentication>
          <div className="w-[1200px] h-auto relative flex flex-col items-center">
            {/* Navbar --------------------- */}
            <NavBar />
          </div>
          <div className="w-[1200px] h-auto relative flex flex-col items-center">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="addToCart" element={<AddToCart />} />
              <Route path="userProfile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="yourProduct" element={<UserProduct />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* footer -------------------- */}
            <Footer />
          </div>
        </UserGoogleAuthentication>
      </Router>
    </section>
  );
};

export default App;
