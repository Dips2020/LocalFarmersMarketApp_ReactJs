/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { useContext, useState, useRef, useEffect } from "react";
import { GiFarmer } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import pp from "../../../assets/profile/pp.jpg";
import { getUserRole } from "../../DatabaseOperation/DatabaseOperation";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const { user, logOut, handleFormSubmit } = useContext(UserContext);
  const [dropMenu, setDropMenu] = useState(false);
  const navigate = useNavigate();

  //TODO: =================================
  const manualLogin = () => {
    // Check if user is already logged in using localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      handleFormSubmit(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    manualLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setTimeout(() => {
    // Fetch user's role if user is authenticated
    if (user && user.uid) {
      fetchUserRole();
    }
  }, 1000);

  // for user Role fetching to verify user's role Farmer or Customer
  const [userRole, setUserRole] = useState(null); // State to store user's role
  const fetchUserRole = async () => {
    try {
      const role = await getUserRole(user.uid); // Fetch user's role from the database
      setUserRole(role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  //handle sign out
  const handleSignOut = async () => {
    try {
      await logOut().then(() => navigate("/"));
      // await logOut();
      window.location.reload(); // Refresh the page after successful logout
    } catch (error) {
      console.log("Logout errors:", error);
    }
  };

  // drop down menu ref
  const menuRef = useRef();
  const imgRef = useRef();
  //* card outside click is --> false
  //* card and profile inside click is --> true
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setDropMenu(false);
    }
  });

  return (
    <div className="flex justify-end items-center border-b-2 border-white rounded-b-lg bg-[#036016] h-[90px] space-x-2 pr-1 w-[1200px] fixed z-30">
      {/* Logo */}
      <div
        onClick={() => {
          navigate("/");
        }}
        className="text-center text-6xl py-8 absolute left-0 text-black h-[90px] flex justify-center items-center cursor-pointer"
      >
        <GiFarmer />
      </div>
      <div>
        <div className="flex h-[50px] justify-around items-center w-[375px] text-[18px]">
          <Link to="/">
            <button className="border-2 hover:border-[#069E2D] hover:text-[#069E2D] text-white font-semibold rounded-lg transition-all duration-300 w-[120px] h-[50px]">
              Home
            </button>
          </Link>
          <Link to="/contact">
            <button className="border-2 hover:border-[#069E2D] hover:text-[#069E2D] text-white font-semibold rounded-lg transition duration-300 w-[120px] h-[50px]">
              Contact Us
            </button>
          </Link>
          <Link to="/blog">
            <button className="border-2 hover:border-[#069E2D] hover:text-[#069E2D] text-white font-semibold rounded-lg transition duration-300 w-[120px] h-[50px]">
              Blog
            </button>
          </Link>
        </div>
      </div>
      <div className="h-[50px] w-[300px] flex justify-between items-center relative">
        <input
          type="text"
          name="search"
          placeholder="What do you need?"
          className="h-full w-full rounded-lg pl-2 outline-none border-[#FBF9F4] bg-[#FBF9F4] hover:border-[#069E2D] border-[2px] transition duration-300"
        />
        <BiSearchAlt2 className="absolute right-2 text-2xl text-[#036016]" />
      </div>
      {user?.email ? (
        <div className="w-[150px] flex justify-around items-center">
          <Link to="addToCart">
            <FaShoppingCart className="h-[50px] w-[50px] cursor-pointer text-white" />
          </Link>
          <img
            ref={imgRef}
            onClick={() => setDropMenu(!dropMenu)}
            src={user?.photoURL || pp}
            alt="User-Profile"
            className="h-[75px] w-[75px] object-cover border-2 border-white rounded-full cursor-pointer  hover:border-[#069E2D] flex justify-center items-center"
          />
          {dropMenu && (
            <div className="bg-white w-[150px] h-auto shadow-lg flex flex-col justify-center items-center absolute top-[85px] right-[3px] rounded-md z-10 p-2">
              <ul
                ref={menuRef}
                className=" text-[16px] font-bold flex flex-col justify-center items-center h-full w-full gap-1"
              >
                <Link
                  to="userProfile"
                  className="cursor-pointer h-[40px] w-[90%] flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500"
                >
                  Profile
                </Link>
                {userRole === "Farmer" && (
                  <>
                    <Link
                      to="dashboard"
                      className="cursor-pointer h-[40px] w-[90%] flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="yourProduct"
                      className="cursor-pointer h-[40px] w-[90%] flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500"
                    >
                      Your Products
                    </Link>
                  </>
                )}
                <li
                  onClick={handleSignOut}
                  className="cursor-pointer h-[40px] w-[90%] flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="w-[310px] flex justify-around items-center">
          {/* Display Sign Up and Login buttons only if user is not logged in */}
          <Link to="/login">
            <button className="border-2 border-white hover:border-[#ff4fad] text-white font-semibold rounded-lg transition duration-300 w-[150px] h-[50px] text-[18px]">
              Login
            </button>
          </Link>
          <Link to="/signUp">
            <button className="bg-white border-white border-2 hover:border-[#ff4fad] text-black font-semibold py-2 px-4 rounded-lg transition duration-300 w-[150px] h-[50px] text-[18px]">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
