/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { database, ref, get } from "../../config/DatabaseConnection";
import { IoMdCart } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";

const Products = () => {
  const [userProducts, setUserProducts] = useState({});

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

  return (
    <div className="h-auto w-[1200px] bg-blue-200 text-center z-40 flex justify-center items-center flex-wrap rounded-t-lg space-y-1">
      {Object.entries(userProducts).map(([uid, products], index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center h-auto w-full pt-4 gap-1"
        >
          <div className="flex justify-start items-center w-full h-[50px] pl-2 bg-[#dddcdc]">
            <h1 className="text-[14px] flex justify-center items-center gap-2 h-[40px] border-t-2 border-gray-400 border-l-2 rounded-lg p-2">
              Farmer:
              <span className="font-bold text-[20px] border-gray-400">
                {uid}
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap justify-around items-center w-full h-auto">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col flex-wrap w-[280px] h-auto justify-center gap-4 items-center bg-purple-300 rounded-lg p-4 relative m-2"
              >
                <img
                  src={product.product_Url}
                  alt={product.product_Name}
                  className="object-contain h-[200px] w-[200px] rounded-lg mb-2 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
                <div className="flex flex-col items-start justify-start h-auto w-full gap-2 ">
                  <h2 className="font-bold text-2xl">{product.product_Name}</h2>
                  <h2 className="text-[14px] flex justify-center items-center gap-2">
                    Price:
                    <span className="text-red-500 text-[18px]">
                      ${product.product_Price}{" "}
                    </span>
                  </h2>
                  <h2 className="text-[20px] flex justify-center items-center h-[30px] gap-2">
                    <TbCategoryFilled />
                    <span className="text-[12px]">
                      {product.product_Category}{" "}
                    </span>
                  </h2>
                </div>
                <div className="flex w-full h-[40px] justify-between items-center">
                  <button className="w-[45%] bg-red-500 font-semibold rounded-md h-[35px] text-[#efe3e3] hover:bg-red-600  flex justify-center items-center transition-all duration-300">
                    Buy Now
                  </button>
                  <button className="w-[50%] bg-blue-500 font-semibold rounded-md h-[35px] text-[#efe3e3] hover:bg-blue-600  flex justify-evenly items-center transition-all duration-300 pl-2 pr-2">
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
