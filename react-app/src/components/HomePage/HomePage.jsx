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

  const handleRoleSelection = async (role) => {
    if (user && user.uid) {
      await insertGoogleAuthData(
        user.uid,
        user.email,
        user.displayName,
        role,
        "",
        null,
        null,
        null
      );

      setShowRoleSelection(false);
    } else {
      console.error("User not found.");
    }
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
      {/* ======================================================================================= */}
      <div>
        <Products />
      </div>

      {showRoleSelection && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-[300px] h-[200px] flex flex-col justify-evenly items-center">
            <h2 className="text-[12px]">Please !</h2>
            <h1 className="text-2xl font-bold mb-4 text-red-700">
              Choose Your Role
            </h1>
            <div className="flex justify-between w-[80%] h-auto">
              <button
                onClick={() => handleRoleSelection("Farmer")}
                className="bg-[#069E2D] hover:bg-[#036016] text-white font-semibold rounded-lg w-[100px] h-[40px]"
              >
                Farmer
              </button>
              <button
                onClick={() => handleRoleSelection("Customer")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg w-[100px] h-[40px]"
              >
                Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
