/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FaShopify } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdProductionQuantityLimits } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="h-auto w-full bg-red-200 pb-2 mt-[100px] rounded-t-lg flex justify-between items-center relative">
      {/* sidebar */}
      <div className="w-[300px] h-[550px] bg-blue-200 flex flex-col justify-center gap-4 items-center relative ml-2">
        <div className="flex justify-start items-center gap-2 w-full h-[50px] p-2 absolute top-0 border-b-2 border-gray-500">
          <BiSolidDashboard className="text-4xl" />
          <h1 className="text-2xl font-bold tracking-[4px]">DASHBOARD</h1>
        </div>

        <Link
          to="/yourProduct"
          className="w-full h-[50px] bg-green-300 flex justify-start gap-6 p-4 items-center"
        >
          <FaShopify className="text-2xl" />
          <h1 className="text-[20px] font-bold tracking-[2px]">Go to Store</h1>
        </Link>
        <button className="w-full h-[50px] bg-green-500 flex justify-start gap-6 p-4 items-center">
          <TbCategoryFilled className="text-2xl" />
          <h1 className="text-[20px] font-bold tracking-[2px]">Categories</h1>
        </button>
        <button className="w-full h-[50px] bg-green-500 flex justify-start gap-6 p-4 items-center">
          <MdProductionQuantityLimits className="text-2xl" />
          <h1 className="text-[20px] font-bold tracking-[2px]">Products</h1>
        </button>
      </div>
      {/* analytics */}
      <div className="w-[850px] h-[550px] bg-green-300 flex flex-col justify-between  mr-2">
        {/* boxes */}
        <div className="w-full h-[150px] bg-yellow-200 flex justify-between">
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Orders</h1>
            <h2 className="text-3xl font-bold">2</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Sold</h1>
            <h2 className="text-3xl font-bold">2</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Categories</h1>
            <h2 className="text-3xl font-bold">2</h2>
          </div>
        </div>
        {/* Recent activity */}
        {/* Recent activity */}
        <div className="w-full h-[380px] bg-orange-300 rounded-lg p-2 flex flex-col gap-2">
          <h1 className="text-[16px] font-semibold ">Recent Activity</h1>
          <div className="flex w-full bg-green-400 justify-evenly h-full border-t-2 border-gray-400">
            <div className="w-[50%] p-2 border-r-2 border-gray-400 flex flex-col justify-center">
              <h1 className="border-b-2 border-gray-400 font-semibold w-[120px] flex justify-start items-center">
                Recent Orders
              </h1>
            </div>
            <div className="w-[50%] flex flex-col justify-center p-2">
              <h1 className="border-b-2 border-gray-400 font-semibold w-[140px] flex justify-start items-center">
                Sold
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
