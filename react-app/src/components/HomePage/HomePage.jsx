/* eslint-disable no-unused-vars */
import React from "react";
import FirstContainer from "./pages/FirstContainer";
import Products from "./ProductPage/Products";

const HomePage = () => {
  return (
    <div className="w-[1200px] bg-[#036016] relative flex flex-col items-center">
      {/* ======================================================================================= */}
      <div className="w-[1200px] bg-[#036016] relative flex flex-col items-center">
        <FirstContainer />
      </div>
      <Products />
      {/* ======================================================================================= */}
    </div>
  );
};

export default HomePage;
