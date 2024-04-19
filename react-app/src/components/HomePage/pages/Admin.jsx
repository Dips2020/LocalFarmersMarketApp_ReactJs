/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database, get, ref } from "../../config/DatabaseConnection";
import { useContext } from "react";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { RiDashboard2Line } from "react-icons/ri";

const Admin = () => {
  const [farmerCount, setFarmerCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // users node to fetch role for Farmer and Customer
    const usersRef = ref(database, "users");
    const fetchFarmerCount = async () => {
      try {
        const snapshot = await get(usersRef);
        const users = snapshot.val();
        if (users) {
          // Count the number of users with the role "Farmer"
          const farmerCount = Object.values(users).filter(
            (user) => user.role === "Farmer"
          ).length;
          setFarmerCount(farmerCount);
        }
        // Count the number of users with the role "Customer"
        const customerCount = Object.values(users).filter(
          (user) => user.role === "Customer"
        ).length;
        setCustomerCount(customerCount);
      } catch (error) {
        console.error("Error fetching farmer count:", error);
      }
    };

    // ProductDetails node to fetch all the product_Category and product_Name
    const fetchProductCategoriesAndProducts = async () => {
      try {
        const usersSnapshot = await get(ref(database, "users"));
        const users = usersSnapshot.val();

        if (users) {
          // Array to hold all product categories
          let allCategories = [];
          let allProducts = [];

          // Iterate through each user
          for (const userId in users) {
            const userProductDetailsRef = ref(
              database,
              `ProductDetails/${userId}`
            );
            const productDetailsSnapshot = await get(userProductDetailsRef);
            const productDetails = productDetailsSnapshot.val();

            // If user has product details
            if (productDetails) {
              // Extract product categories and add to allCategories array
              const categories = Object.values(productDetails).map(
                (product) => product.product_Category
              );
              allCategories = allCategories.concat(categories);

              // Extract product categories and add to allCategories array
              const totalProducts = Object.values(productDetails).map(
                (product) => product.product_Name
              );
              allProducts = allProducts.concat(totalProducts);
            }
          }

          // Count the number of unique categories
          const uniqueCategories = [...new Set(allCategories)];
          setCategoryCount(uniqueCategories.length);

          // Count the number of unique categories
          const uniqueProducts = [...new Set(allProducts)];
          setProductCount(uniqueProducts.length);
        }
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };

    fetchProductCategoriesAndProducts();
    fetchFarmerCount();
  }, []);

  return (
    <div className="h-auto w-full mt-[100px] rounded-t-lg flex flex-col justify-between items-center relative bg-gray-200">
      <div className="h-[60px] w-full flex justify-start items-center pl-2 gap-1 border-b-2 border-gray-400">
        <RiDashboard2Line className="text-4xl" />
        <h1 className="p-1 text-center w-[280px] tracking-[4px] font-extrabold text-[1.2rem]">
          ADMIN DASHBOARD
        </h1>
      </div>
      {/* analytics */}
      <div className="w-full h-[550px] flex flex-col justify-between mt-1">
        {/* boxes */}
        <div className="w-full h-[150px] flex justify-between p-2">
          <div className="w-[190px] h-[150px] bg-orange-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
              Farmers
            </h1>
            <h2 className="text-3xl font-bold">{farmerCount}</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
              Customers
            </h1>
            <h2 className="text-3xl font-bold">{customerCount}</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
              Categories
            </h1>
            <h2 className="text-3xl font-bold">{categoryCount}</h2>
          </div>
          <div className="w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
            <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
              Total Products
            </h1>
            <h2 className="text-3xl font-bold">{productCount}</h2>
          </div>
        </div>
        {/* Recent activity */}
        <div className="w-full h-[380px] rounded-md p-2 flex flex-col gap-2">
          <h1 className="text-[14px] font-semibold ">Recent Activity</h1>
          <div className="flex w-full bg-gray-500 justify-center items-center h-full rounded-md">
            {/* Activity */}
            <div className="w-[40%] h-full border-r-2 border-white flex flex-col justify-start items-center">
              <h1 className="border-b-2 w-full h-[30px] border-white font-semibold flex justify-center items-center text-[16px]">
                Farmers Activity
              </h1>
              <div className="w-full h-auto mt-[4px] bg-red-300">
                <div className="w-full h-[40px] flex justify-evenly items-center">
                  <h1 className="text-[10px]">
                    <span className="text-[14px] font-semibold mr-2">
                      dipsbhattarai@gmail.com
                    </span>
                    created Farmer account
                  </h1>
                  <div className="flex justify-evenly items-center w-[150px] h-auto">
                    <button className="w-[70px] border-2 font-semibold rounded-md h-[25px] text-[10px]">
                      Accept User
                    </button>
                    <button className="w-[70px] border-2 font-semibold rounded-md h-[25px] text-[10px]">
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[40%] h-full border-r-2 border-white flex flex-col justify-start items-center">
              <h1 className="border-b-2 w-full h-[30px] border-white font-semibold flex justify-center items-center text-[16px]">
                Customers Activity
              </h1>
              <div className="w-full h-auto mt-[4px] bg-blue-400">
                <div className="w-full h-[40px] flex justify-evenly items-center">
                  <h1 className="text-[10px]">
                    <span className="text-[14px] font-semibold mr-2">
                      dipsbhattarai@gmail.com
                    </span>
                    created Customer account
                  </h1>
                  <div className="flex justify-evenly items-center w-[150px] h-auto">
                    <button className="w-[70px] border-2 font-semibold rounded-md h-[25px] text-[10px]">
                      Accept User
                    </button>
                    <button className="w-[70px] border-2 font-semibold rounded-md h-[25px] text-[10px]">
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[20%] h-full flex flex-col justify-start items-center">
              <h1 className="border-b-2 w-full h-[30px] border-white font-semibold flex justify-center items-center text-[16px]">
                Category List
              </h1>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
