import { Link } from "react-router-dom";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { useContext, useState, useRef, useEffect } from "react";
import { GiFarmer } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import pp from "../../../assets/profile/pp.jpg";

const NavBar = () => {
  const { user, logOut, handleFormSubmit } = useContext(UserContext);
  const [dropMenu, setDropMenu] = useState(false);
  const navigate = useNavigate();

  //TODO: =================================
  useEffect(() => {
    // Check if user is already logged in using localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      handleFormSubmit(JSON.parse(storedUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handle sign out
  const handleSignOut = async () => {
    try {
      await logOut().then(() => navigate("/"));
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
    <div className="flex justify-end items-center bg-[#81C408] h-[90px] space-x-2 pr-1 w-[1200px] fixed z-30">
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
        <div className="flex h-[50px] justify-around items-center w-[375px]">
          <Link to="/">
            <button className="border-2 hover:border-blue-600 text-white font-semibold rounded-lg transition duration-300 w-[120px] h-[50px]">
              Home
            </button>
          </Link>
          <Link to="/contact">
            <button className="border-2 hover:border-blue-600 text-white font-semibold rounded-lg transition duration-300 w-[120px] h-[50px]">
              Contact Us
            </button>
          </Link>
          <Link to="/blog">
            <button className="border-2 hover:border-blue-600 text-white font-semibold rounded-lg transition duration-300 w-[120px] h-[50px]">
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
          className="h-full w-full rounded-lg pl-2 outline-none border-[#FBF9F4] bg-[#FBF9F4] hover:border-blue-700 border-[2px] transition duration-300"
        />
        <BiSearchAlt2 className="absolute right-2 text-2xl text-[#81C408]" />
      </div>
      {user?.email ? (
        <div className="w-[100px] flex justify-around items-center">
          <img
            ref={imgRef}
            onClick={() => setDropMenu(!dropMenu)}
            src={user?.photoURL || pp}
            alt="User-Profile"
            className="h-[75px] w-[75px] object-cover border-2 border-white rounded-full cursor-pointer  hover:border-blue-600"
          />
          {dropMenu && (
            <div className="bg-white w-[150px] h-[150px] shadow-lg flex flex-col justify-center items-center absolute top-[85px] right-[3px] rounded-md z-10">
              <ul
                ref={menuRef}
                className=" text-[16px] font-bold flex flex-col justify-center items-center h-full w-full space-y-1"
              >
                <li className="cursor-pointer h-[40px] w-[90%] flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500">
                  <Link to="/userProfile">Profile</Link>
                </li>
                <li className="cursor-pointer h-[40px] w-[90%] flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500">
                  <Link to="/yourProduct">Your Products</Link>
                </li>
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
            <button className="border-2 hover:border-blue-600 text-white font-semibold rounded-lg transition duration-300 w-[150px] h-[50px]">
              Login
            </button>
          </Link>
          <Link to="/signUp">
            <button className="bg-[#FBF9F4] border-[#FBF9F4] border-2 hover:border-blue-600 text-black font-semibold py-2 px-4 rounded-lg transition duration-300 w-[150px] h-[50px]">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
