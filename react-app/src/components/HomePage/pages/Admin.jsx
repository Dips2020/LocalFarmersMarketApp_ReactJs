/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  database,
  get,
  ref,
  set,
  update,
  remove,
} from "../../config/DatabaseConnection";
import { useContext } from "react";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { RiDashboard2Line } from "react-icons/ri";
import TextField from "../../FormValidation/userSignUp/TextField";
import { Formik } from "formik";

const Admin = () => {
  const [farmerCount, setFarmerCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const { user } = useContext(UserContext);
  const [farmers, setFarmers] = useState([]);

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

    // fetch user who has chosen role Farmer
    const fetchFarmers = async () => {
      try {
        const usersRef = ref(database, `users`);
        const snapshot = await get(usersRef);
        const users = snapshot.val();

        if (users) {
          const farmerUsers = Object.values(users).filter(
            (user) => user.role === "Farmer"
          );
          setFarmers(farmerUsers);
        }
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    // fetch admin password to check
    const fetchAdminPassword = async () => {
      try {
        const adminRef = ref(database, "Admin/admin_Password");
        const snapshot = await get(adminRef);
        const adminPassword = snapshot.val();
        setAdminPassword(adminPassword);
      } catch (error) {
        console.error("Error fetching admin password:", error);
      }
    };

    // fetched accepted farmers from AcceptedByAdmin node from real time database
    const fetchAcceptedFarmers = async () => {
      try {
        const acceptedFarmersRef = ref(database, "AcceptedByAdmin");
        const snapshot = await get(acceptedFarmersRef);
        const acceptedFarmersData = snapshot.val();

        if (acceptedFarmersData) {
          // Convert object to array of farmers
          const acceptedFarmersArray = Object.values(acceptedFarmersData);
          setAcceptedFarmers(acceptedFarmersArray);
        }
      } catch (error) {
        console.error("Error fetching accepted farmers:", error);
      }
    };

    fetchAcceptedFarmers();
    fetchAdminPassword();
    fetchFarmers();
    fetchProductCategoriesAndProducts();
    fetchFarmerCount();
  }, []);

  // Admin Password Checking
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [adminPassword, setAdminPassword] = useState("");

  // handle password submit for admin
  const handlePasswordSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the entered password matches the admin password from Firebase
    if (password === adminPassword) {
      setShowPopup(false);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  // Function to handle accepting a user
  const [acceptedFarmers, setAcceptedFarmers] = useState([]);

  const handleAcceptUser = async (farmer) => {
    try {
      // Check if the provided farmer object is valid
      if (!farmer || !farmer.email) {
        console.error("Invalid farmer object:", farmer);
        return;
      }

      // Find the user UID corresponding to the provided email
      const usersRef = ref(database, `users`);
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      // If users exist and farmer email matches, get the UID
      let acceptedUserUID = null;
      if (users) {
        for (const uid in users) {
          if (users[uid].email === farmer.email) {
            acceptedUserUID = uid;
            break;
          }
        }
      }

      // If the user UID is found, store the user data inside "AcceptedByAdmin" node
      if (acceptedUserUID) {
        // Move the user to the "Accepted Farmers" section
        const updatedFarmers = farmers.filter((f) => f !== farmer);
        setFarmers(updatedFarmers);
        setAcceptedFarmers([...acceptedFarmers, farmer]);

        // Push the user's details under the "AcceptedByAdmin" node under the user's UID
        const acceptedUsersRef = ref(
          database,
          `AcceptedByAdmin/${acceptedUserUID}`
        );
        await set(acceptedUsersRef, {
          displayName: farmer.displayName || "",
          email: farmer.email,
        });
      } else {
        console.error("User not found with email:", farmer.email);
      }
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };

  //?============================================================
  // Fetch only farmers who are not accepted by admin
  const fetchNonAcceptedFarmers = async () => {
    try {
      const usersRef = ref(database, `users`);
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      if (users) {
        const nonAcceptedFarmers = Object.values(users).filter(
          (user) => user.role === "Farmer" && !isAccepted(user)
        );
        setFarmers(nonAcceptedFarmers);
      }
    } catch (error) {
      console.error("Error fetching non-accepted farmers:", error);
    }
  };

  // Function to check if a farmer is accepted by admin
  const isAccepted = (farmer) => {
    if (!acceptedFarmers || acceptedFarmers.length === 0) {
      return false;
    }
    return acceptedFarmers.some(
      (acceptedFarmer) => acceptedFarmer.email === farmer.email
    );
  };
  // Fetch non-accepted farmers when component mounts
  useEffect(() => {
    fetchNonAcceptedFarmers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFarmers]);

  //* =================================== pop up for rejecting user role
  const [showConfirmRolePopup, setShowConfirmRolePopup] = useState(false);
  const [farmerToReject, setFarmerToReject] = useState(null);

  const handleRejectUser = async (farmer) => {
    try {
      if (!farmer || !farmer.email) {
        console.error("Invalid farmer object:", farmer);
        return;
      }

      // Retrieve the users data
      const usersRef = ref(database, `users`);
      const snapshot = await get(usersRef);
      const users = snapshot.val();
      let userUID = null;

      // If users exist and farmer email matches, get the UID
      if (users) {
        for (const uid in users) {
          if (users[uid].email === farmer.email) {
            userUID = uid;
            break;
          }
        }
      }

      // If the user UID is found, remove the user from "AcceptedByAdmin" node
      if (userUID) {
        // Remove the user from the "AcceptedByAdmin" node
        const acceptedUsersRef = ref(database, `AcceptedByAdmin/${userUID}`);
        await remove(acceptedUsersRef);

        // Remove the farmer from the local state
        const updatedAcceptedFarmers = acceptedFarmers.filter(
          (f) => f !== farmer
        );
        setAcceptedFarmers(updatedAcceptedFarmers);

        // Update user role and storeName to null
        await update(ref(database, `users/${userUID}`), {
          role: null,
          storeName: null,
        });

        // Delete the productName from ProductDetails node
        const productDetailsRef = ref(database, `ProductDetails/${userUID}`);
        const productDetailsSnapshot = await get(productDetailsRef);
        const productDetails = productDetailsSnapshot.val();

        if (productDetails) {
          const productName = Object.keys(productDetails);
          for (const productNames of productName) {
            await remove(
              ref(database, `ProductDetails/${userUID}/${productNames}`)
            );
          }
        }

        // Remove the farmer from the local state
        const updatedFarmers = farmers.filter((f) => f !== farmer);
        setFarmers(updatedFarmers);
      } else {
        console.error("User not found with email:", farmer.email);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  return (
    <Formik initialValues={{ password: "" }}>
      <div className="h-auto w-full mt-[100px] rounded-lg flex flex-col justify-between items-center relative bg-gray-200 mb-2 overflow-hidden">
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex justify-center items-center z-40">
            <div className="bg-white p-4 rounded-md shadow-md flex justify-center flex-col items-center h-auto w-[300px]">
              <label className="block mb-2">Welcome Admin !!!</label>
              <form onSubmit={handlePasswordSubmit}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  type="password"
                  label="Password"
                  required
                />
                <button
                  type="submit"
                  className="block w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
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
            <div className="shadow-lg w-[190px] h-[150px] bg-orange-400 rounded-lg flex flex-col justify-center items-center relative">
              <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
                Farmers
              </h1>
              <h2 className="text-3xl font-bold">{farmerCount}</h2>
            </div>
            <div className="shadow-lg w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
              <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
                Customers
              </h1>
              <h2 className="text-3xl font-bold">{customerCount}</h2>
            </div>
            <div className="shadow-lg w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
              <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
                Categories
              </h1>
              <h2 className="text-3xl font-bold">{categoryCount}</h2>
            </div>
            <div className="shadow-lg w-[190px] h-[150px] bg-purple-400 rounded-lg flex flex-col justify-center items-center relative">
              <h1 className="text-[16px] font-bold absolute top-2 tracking-[1px]">
                Total Products
              </h1>
              <h2 className="text-3xl font-bold">{productCount}</h2>
            </div>
          </div>
          {/* Recent activity */}
          <div className="w-full h-[350px] rounded-md pr-2 pl-2 pt-2 flex flex-col gap-2 pb-[35px]">
            <h1 className="text-[14px] font-semibold ">Recent Activity</h1>
            <div className="flex w-full bg-[#c5c1c1] justify-center items-center h-full rounded-md">
              {/* Activity */}
              <div className="w-[40%] h-full border-r-2 border-black flex flex-col justify-start items-center overflow-auto">
                <h1 className="border-b-2 w-full h-[30px] border-black font-semibold flex justify-center items-center text-[16px]">
                  Farmers Activity
                </h1>
                <div className="w-full h-full overflow-y-auto">
                  <div className="w-full h-auto flex flex-col justify-center items-center gap-1 p-1">
                    {farmers.map((farmer, index) => (
                      <div
                        key={index}
                        className="w-full flex justify-between items-center bg-white bg-opacity-50 shadow-md rounded-md h-[65px] p-2"
                      >
                        <div className="flex flex-col justify-evenly items-start">
                          <p className="text-gray-400 font-semibold text-[10px]">
                            New user :
                          </p>
                          <h1 className="text-[14px] font-bold">
                            {farmer.displayName}{" "}
                            <span className="ml-2 text-[12px] font-normal underline text-blue-700">
                              created Farmer account.
                            </span>
                          </h1>
                          <h2 className="text-[10px] font-semibold">
                            {farmer.email}
                          </h2>
                        </div>

                        <div className="flex justify-evenly items-center w-[150px] h-auto">
                          <button
                            onClick={() => handleAcceptUser(farmer)}
                            className="w-[70px] border-2 border-gray-400 font-semibold rounded-md h-[25px] text-[10px] hover:border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                          >
                            Accept User
                          </button>
                          <button
                            onClick={() => {
                              setFarmerToReject(farmer);
                              setShowConfirmRolePopup(true);
                            }}
                            className="w-[70px] border-2 border-gray-400 font-semibold rounded-md h-[25px] text-[10px] hover:border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                          >
                            Reject User
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-[40%] h-full border-r-2 border-black flex flex-col justify-start items-center overflow-auto">
                <h1 className="border-b-2 w-full h-[30px] border-black font-semibold flex justify-center items-center text-[16px]">
                  Accepted Farmers
                </h1>
                <div className="w-full h-full overflow-y-auto">
                  <div className="w-full h-auto flex flex-col justify-center items-center gap-1 p-1">
                    {/* Render accepted farmers here */}
                    {acceptedFarmers.map((farmer) => (
                      <div
                        key={farmer.email}
                        className="w-full flex justify-between items-center bg-green-500 bg-opacity-80 shadow-md rounded-md h-[65px] p-2"
                      >
                        <div className="flex flex-col justify-evenly items-start">
                          <p className="text-gray-600 font-semibold text-[10px]">
                            Farmer :
                          </p>
                          <h1 className="text-[14px] font-bold">
                            {farmer.displayName}
                          </h1>
                          <h1 className="text-[10px] font-semibold">
                            {farmer.email}
                          </h1>
                        </div>
                        <button
                          onClick={() => {
                            setFarmerToReject(farmer);
                            setShowConfirmRolePopup(true);
                          }}
                          className="w-[70px] border-2 border-white font-semibold rounded-md h-[25px] text-[10px] hover:border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                        >
                          Delete User
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-[20%] h-full flex flex-col justify-start items-center">
                <h1 className="border-b-2 w-full h-[30px] border-black font-semibold flex justify-center items-center text-[16px]">
                  Category List
                </h1>
              </div>
              {/*  */}
            </div>
          </div>
        </div>
        {showConfirmRolePopup && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
            <div className="w-[320px] h-[180px] bg-green-200 rounded-lg flex flex-col justify-evenly items-center relative p-4">
              <div className="h-auto w-full flex flex-col justify-evenly items-center p-2">
                <h3 className="text-[18px] font-bold">Are you sure?</h3>
                <p className="text-[14px]">
                  <span className="font-bold text-red-600 text-[14px] mr-1">
                    Role{" "}
                    <span className="text-black text-[14px] font-semibold">
                      ,
                    </span>{" "}
                    Store Name
                  </span>
                  and{" "}
                  <span className="font-bold text-red-600 text-[14px] mr-1">
                    All Products
                  </span>
                  of this Farmer will be deleted from the store.
                </p>
              </div>
              <div className="w-full h-[50px] flex justify-between items-center">
                <button
                  onClick={() => {
                    if (farmerToReject) {
                      handleRejectUser(farmerToReject);
                    }
                    setShowConfirmRolePopup(false);
                  }}
                  className="font-semibold border-2 border-gray-400 rounded-md w-[100px] hover:border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowConfirmRolePopup(false);
                  }}
                  className="font-semibold border-2 border-gray-400 rounded-md w-[100px] hover:border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Formik>
  );
};

export default Admin;
