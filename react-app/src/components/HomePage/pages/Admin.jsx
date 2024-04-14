/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="h-auto w-full bg-red-200 mt-[100px] rounded-t-lg p-2 flex justify-around items-center relative">
      {/* sidebar */}
      <div className="w-[300px] h-[500px] bg-blue-200 p-2 flex flex-col justify-center items-start">
        <div className="w-[200px] h-[40px] bg-green-300 flex justify-center items-center rounded-lg font-bold">
          <Link to="/yourProduct">Go to Store</Link>
        </div>
      </div>
      {/* analytics */}
      <div className="w-[800px] h-[550px] bg-green-300 flex flex-col justify-between pb-2">
        {/* boxes */}
        <div className="w-full h-[150px] bg-yellow-200 flex justify-between">
          <div className="w-[190px] h-[150px] bg-orange-400 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Farmers</h1>
            <h2 className="text-3xl font-bold">2</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Customers</h1>
            <h2 className="text-3xl font-bold">2</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Categories</h1>
            <h2 className="text-3xl font-bold">2</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Orders</h1>
            <h2 className="text-3xl font-bold">2</h2>
          </div>
        </div>
        {/* Recent activity */}
        <div className="w-full h-[380px] bg-orange-300 rounded-lg p-2 flex flex-col gap-2">
          <h1 className="text-[16px] font-semibold ">Recent Activity</h1>
          <div className="flex w-full bg-green-400 justify-evenly h-full border-t-2 border-gray-400">
            <div className="w-[50%] border-r-2 border-gray-400 flex flex-col justify-center">
              <h1 className="border-b-2 border-gray-400 font-semibold w-[120px] flex justify-center items-center">
                Farmers Activity
              </h1>
              <div>Farmers</div>
            </div>
            <div className="w-[50%] flex flex-col justify-center">
              <h1 className="border-b-2 border-gray-400 font-semibold w-[140px] flex justify-center items-center">
                Customers Activity
              </h1>
              <div>Customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
