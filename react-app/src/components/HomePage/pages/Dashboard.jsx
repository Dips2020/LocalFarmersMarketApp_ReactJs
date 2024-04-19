/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiDashboard2Line } from "react-icons/ri";
import { FaShopify } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";
import { database, ref, get } from "../../config/DatabaseConnection";
import { useContext } from "react";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  // Fetching product_Category (total_Category) and product_Names (total_products)
  const [productCategories, setProductCategories] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const productRef = ref(database, `ProductDetails/${user.uid}`);

    const fetchData = async () => {
      try {
        const snapshot = await get(productRef);
        const data = snapshot.val();
        if (data) {
          // Extract product categories and count unique categories
          const categories = Object.values(data).map(
            (product) => product.product_Category
          );
          const uniqueCategories = [...new Set(categories)];
          setProductCategories(uniqueCategories.length);

          // Count total products
          const productNames = Object.values(data).map(
            (product) => product.product_Name
          );
          const uniqueProductNames = new Set(productNames);
          setTotalProducts(uniqueProductNames.size);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [user.uid]);

  return (
    <div className="h-auto w-full bg-gray-200 mt-[100px] rounded-t-lg flex flex-col justify-between items-center relative">
      {/* sidebar */}
      <div className="h-[60px] w-full flex justify-start items-center pr-2 border-b-2 border-gray-400">
        <div className="flex justify-start items-center w-full h-[50px] pl-2 gap-1">
          <RiDashboard2Line className="text-4xl" />
          <h1 className="p-1 text-center w-[290px] tracking-[4px] font-extrabold text-[1.2rem]">
            FARMER DASHBOARD
          </h1>
        </div>
        <Link
          to="/yourProduct"
          className="w-[250px] h-[40px] bg-[#069E2D] hover:bg-[#04773B] flex justify-start gap-6 p-4 items-center rounded-md"
        >
          <FaShopify className="text-2xl text-white" />
          <h1 className="text-[18px] font-semibold tracking-[2px] text-white">
            Go to Store
          </h1>
        </Link>
      </div>
      {/* analytics */}
      <div className="w-full h-[550px] flex flex-col justify-between mt-1">
        {/* boxes */}
        <div className="w-full h-[150px] flex justify-between p-2">
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] tracking-[1px] font-bold absolute top-2">
              Orders
            </h1>
            <h2 className="text-[12px] font-bold">Loading...</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] tracking-[1px] font-bold absolute top-2">
              Sold-Products
            </h1>
            <h2 className="text-[12px] font-bold">Loading...</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] tracking-[1px] font-bold absolute top-2">
              Total Products
            </h1>
            <h2 className="text-3xl font-bold">{totalProducts}</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] tracking-[1px] font-bold flex w-full justify-center items-center gap-1 absolute top-2">
              <TbCategoryFilled />
              Categories
            </h1>
            <h2 className="text-3xl font-bold">{productCategories}</h2>
          </div>
        </div>
        {/* Recent activity */}
        <div className="w-full h-[380px] rounded-lg p-2 flex flex-col gap-2">
          <h1 className="text-[14px] font-semibold ">Recent Activity</h1>
          <div className="flex w-full bg-gray-500 justify-evenly h-full rounded-md">
            {/* Activity */}
            <div className="w-[50%] h-full border-r-2 border-white flex flex-col justify-start items-center">
              <h1 className="border-b-2 w-full h-[30px] border-white font-semibold flex justify-center items-center text-[16px]">
                Recent Orders
              </h1>
              <div className="w-[98%] h-auto mt-[4px] bg-red-300">Hello</div>
            </div>
            <div className="w-[50%] h-full flex flex-col justify-start items-center">
              <h1 className="border-b-2 w-full h-[30px] border-white font-semibold flex justify-center items-center text-[16px]">
                Sold Products
              </h1>
              <div className="w-[98%] h-auto mt-[4px] bg-red-300">Hello</div>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Dashboard;
