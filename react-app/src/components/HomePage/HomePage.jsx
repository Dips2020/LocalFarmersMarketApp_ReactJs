import FirstContainer from "./pages/FirstContainer";
import Products from "./ProductPage/Products";

const HomePage = () => {
  return (
    <div className="w-[1200px] bg-[#FBF9F4] relative flex flex-col items-center">
      {/* ======================================================================================= */}
      <div className="w-[1200px] bg-[#FBF9F4] relative flex flex-col items-center">
        <FirstContainer />
      </div>
      {/* ======================================================================================= */}
      <div>
        <Products />
      </div>
    </div>
  );
};

export default HomePage;
