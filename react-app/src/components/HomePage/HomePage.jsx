/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import FirstContainer from "./pages/FirstContainer";
import Products from "./ProductPage/Products";
import { insertGoogleAuthData } from "../DatabaseOperation/DatabaseOperation";
import { useContext } from "react";
import { UserContext } from "../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { get, database, ref } from "../config/DatabaseConnection";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [userData, setUserData] = useState({
    selectedRole: "",
    storeName: "",
  });

  const handleRoleSelection = async (role) => {
    if (user && user.uid) {
      if (role === "Farmer") {
        // If the selected role is "Farmer", set selectedRole and show role selection modal again
        setUserData((prevState) => ({ ...prevState, selectedRole: role }));
        setShowRoleSelection(true);
      } else {
        // For other roles, insert user data into the database
        await insertGoogleAuthData(
          user.uid,
          user.email,
          user.displayName,
          role,
          userData.storeName
        );

        setShowRoleSelection(false);
        // Reload the page after 1 second
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      console.error("User not found.");
    }
  };

  const handleStoreNameSubmit = async () => {
    // Insert user data into the database
    await insertGoogleAuthData(
      user.uid,
      user.email,
      user.displayName,
      userData.selectedRole,
      userData.storeName
    );

    setShowRoleSelection(false);
    // Reload the page after 1 second
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const checkUserRole = async () => {
      if (user && user.uid) {
        // Check if the user's role is already set
        const userDataSnapshot = await get(ref(database, `users/${user.uid}`));
        const userData = userDataSnapshot.val();

        if (userData && userData.role) {
          // If the user's role is already set, don't display the role selection modal
          setShowRoleSelection(false);
        } else {
          // If the user's role is not set, display the role selection modal after 3 seconds
          const timeout = setTimeout(() => {
            setShowRoleSelection(true);
          }, 1000);
          return () => clearTimeout(timeout);
        }
      }
    };

    checkUserRole();
  }, [user]);

  return (
    <div className="w-[1200px] bg-[#036016] relative flex flex-col items-center">
      {/* ======================================================================================= */}
      <div className="w-[1200px] bg-[#036016] relative flex flex-col items-center">
        <FirstContainer />
      </div>
      <Products />
      {/* ======================================================================================= */}
      {showRoleSelection && !userData.selectedRole && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-[300px] h-[200px] flex flex-col justify-evenly items-center">
            <h2 className="text-[12px]">Please !</h2>
            <h1 className="text-2xl font-bold mb-4 text-red-700">
              Choose Your Role
            </h1>
            <div className="flex justify-between w-[80%] h-auto">
              <button
                onClick={() => handleRoleSelection("Farmer")}
                className="bg-[#069E2D] hover:bg-[#036016] text-white font-semibold rounded-md w-[100px] h-[40px]"
              >
                Farmer
              </button>
              <button
                onClick={() => handleRoleSelection("Customer")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md w-[100px] h-[40px]"
              >
                Customer
              </button>
            </div>
          </div>
        </div>
      )}
      {showRoleSelection && userData.selectedRole === "Farmer" && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-[300px] h-[240px] flex flex-col justify-evenly items-center">
            <h2 className="text-[12px]">Please !</h2>
            <h1 className="text-2xl font-bold mb-4 text-red-700">
              Enter Store Name
            </h1>
            <input
              type="text"
              value={userData.storeName}
              onChange={(e) =>
                setUserData((prevState) => ({
                  ...prevState,
                  storeName: e.target.value,
                }))
              }
              className="bg-gray-100 p-2 rounded-md w-[80%] h-[40px] outline-none border-2 border-gray-200 hover:border-[#069E2D]"
              placeholder="Enter store name"
            />
            <div className="flex justify-center items-center w-[100px] h-[40px]">
              <button
                onClick={handleStoreNameSubmit}
                className="bg-[#069E2D] hover:bg-[#036016] text-white font-semibold rounded-lg w-[100px] h-[40px] flex justify-center items-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
