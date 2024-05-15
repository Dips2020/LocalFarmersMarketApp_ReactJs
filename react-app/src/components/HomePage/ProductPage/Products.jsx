/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { database, ref, get, set } from "../../config/DatabaseConnection";
import { IoMdCart } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { IoFilter } from "react-icons/io5";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { useContext } from "react";

const Products = () => {
  const { user } = useContext(UserContext);
  const [userProducts, setUserProducts] = useState({});
  const [storeNames, setStoreNames] = useState({}); // for fetching storeName

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productRef = ref(database, "ProductDetails");
        const snapshot = await get(productRef);
        const productsByUser = {};

        snapshot.forEach((userSnapshot) => {
          const uid = userSnapshot.key;
          const userData = userSnapshot.val();

          productsByUser[uid] = Object.values(userData);
        });

        setUserProducts(productsByUser);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchStoreNames = async () => {
      const newStoreNames = {};
      for (const uid in userProducts) {
        newStoreNames[uid] = await fetchStoreName(uid);
      }
      setStoreNames(newStoreNames);
    };

    fetchStoreNames();
  }, [userProducts]);

  const fetchStoreName = async (uid) => {
    try {
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);
      const userData = snapshot.val();

      if (userData) {
        return userData.storeName;
      } else {
        return "Unknown";
      }
    } catch (error) {
      console.error("Error fetching store name:", error);
      return "Unknown";
    }
  };

  // State for checkboxes
  const [showFarmers, setShowFarmers] = useState(true);
  const [showCategories, setShowCategories] = useState(true);

  // Checkbox change handlers
  const handleFarmersChange = () => {
    setShowFarmers(!showFarmers);
  };

  const handleCategoriesChange = () => {
    setShowCategories(!showCategories);
  };

  //! ===================================
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Add product to the cart state
    setCart([...cart, product]);

    // Add product to Firebase cart node
    const cartRef = ref(
      database,
      `AddToCart/${user.uid}/${product.product_Name}`
    );
    set(cartRef, product);
  };

  return (
    <div className="h-auto w-[1200px] bg-[#036016] text-center flex justify-center items-center flex-wrap rounded-t-lg space-y-3 mb-2">
      <div className="flex w-full h-[60px] justify-center items-center gap-4">
        <IoFilter className="text-[20px] text-white" />
        <div className="flex h-full gap-1 justify-center items-center">
          {/* Checkbox for showing Farmers */}
          <label className="text-2xl w-[180px] h-[40px] text-[18px] text-white font-semibold tracking-[2px] flex justify-center gap-2 items-center">
            <input
              type="checkbox"
              checked={showFarmers}
              onChange={handleFarmersChange}
              className="h-[20px] w-[20px]"
            />
            Farmers
          </label>
          {/* Checkbox for showing Categories */}
          <label className="text-2xl w-[180px] h-[40px] text-[18px] text-yellow-400 font-semibold tracking-[2px] flex justify-center gap-2 items-center">
            <input
              type="checkbox"
              checked={showCategories}
              onChange={handleCategoriesChange}
              className="h-[20px] w-[20px]"
            />
            Categories
          </label>
        </div>
      </div>

      {/* //! =========================================================================================================================== */}
      {/* Conditional rendering based on checkbox state */}
      {showCategories &&
        // Displaying according to category
        Object.entries(
          Object.values(userProducts).reduce((acc, products) => {
            products.forEach((product) => {
              if (!acc[product.product_Category]) {
                acc[product.product_Category] = [];
              }
              acc[product.product_Category].push(product);
            });
            return acc;
          }, {})
        ).map(([category, categoryProducts], categoryIndex) => (
          // Category section JSX
          <div
            key={categoryIndex}
            className="h-auto w-full rounded-lg flex flex-col justify-between items-center"
          >
            {/* Category header */}
            <div className="w-full h-auto flex flex-col justify-between items-center bg-[#c5c1c1] rounded-t-lg">
              {/* Category title */}
              <div className="flex justify-center items-center w-full h-[50px] pl-2 bg-[#e0dcdc] rounded-t-lg">
                <h2 className="text-[14px] flex justify-center items-center gap-2 h-[40px] border-gray-400 border-b-2 rounded-2xl p-2">
                  Category:
                  <span className="font-bold text-[20px] border-gray-400">
                    {category || "Unknown Category"}
                  </span>
                </h2>
              </div>

              {/* Category products */}
              <div className="flex flex-wrap justify-between items-center w-full h-auto">
                {categoryProducts.map((product, productIndex) => (
                  // Product item JSX
                  <div
                    key={productIndex}
                    className="flex flex-col flex-wrap w-[280px] h-auto justify-center gap-4 items-center bg-[#e0dcdc] rounded-lg p-4 relative mt-2"
                  >
                    {/* Product image */}
                    <img
                      src={product.product_Url}
                      alt={product.product_Name}
                      className="object-contain h-[200px] w-[200px] rounded-lg mb-2 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110"
                    />
                    {/* Product details */}
                    <div className="flex flex-col items-start justify-start h-auto w-full gap-2 ">
                      <h2 className="font-bold text-2xl">
                        {product.product_Name}
                      </h2>
                      <h2 className="text-[14px] flex justify-center items-center gap-2">
                        Price:
                        <span className="text-red-500 text-[18px]">
                          ${product.product_Price}
                        </span>
                      </h2>
                      <h2 className="text-[20px] flex justify-center items-center h-[30px] gap-2">
                        <TbCategoryFilled />
                        <span className="text-[12px]">
                          {product.product_Category}
                        </span>
                      </h2>
                    </div>
                    {/* Product buttons */}
                    <div className="flex w-full h-[40px] justify-between items-center">
                      <button className="w-[45%] bg-red-500 font-semibold rounded-md h-[35px] text-[#efe3e3] hover:bg-red-600  flex justify-center items-center transition-all duration-300">
                        Buy Now
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-[50%] bg-blue-500 font-semibold rounded-md h-[35px] text-[#efe3e3] hover:bg-blue-600  flex justify-evenly items-center transition-all duration-300 pl-2 pr-2"
                      >
                        Add to Cart
                        <span className="text-[20px] text-black">
                          <IoMdCart />
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

      {/* //! =========================================================================================================================== */}
      {/* Conditional rendering based on checkbox state */}
      {showFarmers &&
        // Displaying each Farmers store and their all products
        Object.entries(userProducts).map(([uid, products], index) => (
          // Farmer section JSX

          <div
            key={index}
            className="flex flex-col justify-between items-center h-auto w-full rounded-lg bg-[#c5c1c1]"
          >
            {/* Farmer header */}
            <div className="flex justify-start items-center w-full h-[50px] pl-2 bg-[#e0dcdc] rounded-t-lg">
              <h1 className="text-[14px] flex justify-center items-center gap-2 h-[40px] border-t-2 border-gray-400 border-l-2 rounded-lg p-2">
                Farmer:
                <span className="font-bold text-[20px] border-gray-400">
                  {storeNames[uid] || "Loading..."}
                </span>
              </h1>
            </div>
            {/* Farmer products */}
            <div className="flex flex-wrap justify-between items-center w-full h-auto">
              {products.map((product, index) => (
                // Product item JSX
                <div
                  key={index}
                  className="flex flex-col flex-wrap w-[280px] h-auto justify-center gap-4 items-center bg-[#e0dcdc] rounded-lg p-4 relative mt-2"
                >
                  {/* Product image */}
                  <img
                    src={product.product_Url}
                    alt={product.product_Name}
                    className="object-contain h-[200px] w-[200px] rounded-lg mb-2 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110"
                  />
                  {/* Product details */}
                  <div className="flex flex-col items-start justify-start h-auto w-full gap-2 ">
                    <h2 className="font-bold text-2xl">
                      {product.product_Name}
                    </h2>
                    <h2 className="text-[14px] flex justify-center items-center gap-2">
                      Price:
                      <span className="text-red-500 text-[18px]">
                        ${product.product_Price}
                      </span>
                    </h2>
                    <h2 className="text-[20px] flex justify-center items-center h-[30px] gap-2">
                      <TbCategoryFilled />
                      <span className="text-[12px]">
                        {product.product_Category}
                      </span>
                    </h2>
                  </div>
                  {/* Product buttons */}
                  <div className="flex w-full h-[40px] justify-between items-center">
                    <button className="w-[45%] bg-red-500 font-semibold rounded-md h-[35px] text-[#efe3e3] hover:bg-red-600  flex justify-center items-center transition-all duration-300">
                      Buy Now
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-[50%] bg-blue-500 font-semibold rounded-md h-[35px] text-[#efe3e3] hover:bg-blue-600  flex justify-evenly items-center transition-all duration-300 pl-2 pr-2"
                    >
                      Add to Cart
                      <span className="text-[20px] text-black">
                        <IoMdCart />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
