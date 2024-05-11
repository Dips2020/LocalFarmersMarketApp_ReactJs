//
import { useState, useEffect, useRef } from "react";
import {
  database,
  ref,
  get,
  update,
  remove,
} from "../../config/DatabaseConnection";
import { useContext } from "react";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { FaChevronDown } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [fetchUserName, setFetchUserName] = useState("");
  const [fetchUserEmail, setFetchUserEmail] = useState("");
  const [fetchUserRole, setFetchUserRole] = useState("");
  const [fetchUserStoreName, setFetchUserStoreName] = useState("");

  useEffect(() => {
    const fetchUserNameFromDatabase = async () => {
      if (user && user.uid) {
        try {
          // Fetch display name
          const displayNameRef = ref(database, `users/${user.uid}/displayName`);
          const displayNameSnapshot = await get(displayNameRef);
          const displayName = displayNameSnapshot.val();
          if (displayName) {
            setFetchUserName(displayName);
          }

          // Fetch email
          const emailRef = ref(database, `users/${user.uid}/email`);
          const emailSnapshot = await get(emailRef);
          const email = emailSnapshot.val();
          if (email) {
            setFetchUserEmail(email);
          }

          // Fetch role
          const roleRef = ref(database, `users/${user.uid}/role`);
          const roleSnapshot = await get(roleRef);
          const role = roleSnapshot.val();
          if (role) {
            setFetchUserRole(role);
          }

          // Fetch role
          const storeNameRef = ref(database, `users/${user.uid}/storeName`);
          const storeNameSnapshot = await get(storeNameRef);
          const storeName = storeNameSnapshot.val();
          if (storeName) {
            setFetchUserStoreName(storeName);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserNameFromDatabase();
  }, [user]);

  // Changing User Role drop down menu
  const [dropMenu, setDropMenu] = useState(false);
  // drop down menu ref
  const menuRef = useRef();
  const btnRef = useRef();
  //* card outside click is --> false
  //* card and profile inside click is --> true
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== btnRef.current) {
      setDropMenu(false);
    }
  });

  // Function to handle role change
  const [selectedRole, setSelectedRole] = useState(""); // State to store selected role
  const [showRoleChangePopup, setShowRoleChangePopup] = useState(false); // State to manage pop-up visibility

  const handleRoleChange = async (newRole) => {
    try {
      if (!user || !user.uid) {
        console.error("User UID is undefined.");
        return;
      }
      await update(ref(database, `users/${user.uid}`), { role: newRole });
      setFetchUserRole(newRole);

      //? if the role is selected Customer then users storeName along with productNames will be deleted too
      if (newRole === "Customer") {
        // Remove storeName from users node
        await update(ref(database, `users/${user.uid}`), { storeName: null });
        // Define the path to the user's ProductDetails node using their UID
        const productRef = ref(database, `ProductDetails/${user.uid}`);
        const productSnapshot = await get(productRef); // Get the snapshot of the ProductDetails node
        // Check if the node exists
        if (productSnapshot.exists()) {
          // Get the list of productNames
          const productName = Object.keys(productSnapshot.val());
          // Loop through each productName and delete it
          productName.forEach(async (productNames) => {
            await remove(
              ref(database, `ProductDetails/${user.uid}/${productNames}`),
              null
            );
          });
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  // Pop up for customer
  const [showConfirmationPopupCustomer, setShowConfirmationPopupCustomer] =
    useState("");
  const handleCustomer = () => {
    setShowConfirmationPopupCustomer(true);
  };

  // Pop up for Farmer
  const [showConfirmationPopupFarmer, setShowConfirmationPopupFarmer] =
    useState("");
  const handleFarmer = () => {
    setShowConfirmationPopupFarmer(true);
  };

  // Pop up for storeName
  const [showStoreNamePopup, setShowStoreNamePopup] = useState(false);
  const [newStoreName, setNewStoreName] = useState("");
  const handleNewStoreName = async () => {
    try {
      if (!user || !user.uid) {
        console.error("User UID is undefined.");
        return;
      }
      if (!newStoreName) {
        console.error("Store name is required.");
        return;
      }
      await update(ref(database, `users/${user.uid}`), {
        storeName: newStoreName,
      });
      setFetchUserStoreName(newStoreName);
      window.location.reload();
    } catch (error) {
      console.error("Error updating store name:", error);
    }
  };

  return (
    <div className="h-[500px] w-full bg-red-200 mt-[100px] rounded-lg mb-2 flex">
      <div className="w-[30%] h-full flex flex-col rounded-l-lg bg-gradient-to-r from-[#536976] to-[#BBD2C5]">
        Profile
      </div>
      <div className="w-[70%] h-full flex flex-col bg-blue-100 rounded-r-lg bg-gradient-to-r from-[#536976] to-[#BBD2C5]">
        <div>
          <h1>{fetchUserName}</h1>
          <h1>{fetchUserEmail}</h1>
          <h1>{fetchUserRole}</h1>
          <h1>{fetchUserStoreName}</h1>
        </div>
        {/* Advance Setting =============================================== */}
        <h1 className="mt-10">Advance Settings</h1>
        {/* Change Role */}
        <div className="bg-red-200 h-auto flex gap-4 items-center">
          <h1 className="text-[18px] font-bold">Change Role :</h1>
          <div className="relative h-auto">
            <button
              ref={btnRef}
              onClick={() => setDropMenu(!dropMenu)}
              className="bg-[#069E2D] hover:bg-[#04773B] text-[18px] text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[200px] h-[50px] cursor-pointer flex justify-center items-center gap-4"
            >
              {selectedRole || "Change Role"}
              <FaChevronDown className="text-[18px]" />
            </button>
            {dropMenu && (
              <div className="bg-white w-[200px] h-auto shadow-lg flex flex-col justify-center items-center rounded-md z-10 p-2 absolute">
                <ul ref={menuRef} className="w-full">
                  <div className="flex flex-col w-[99%] gap-1 font-semibold">
                    <button
                      onClick={() => {
                        setSelectedRole("Customer");
                        if (fetchUserRole === "Customer") {
                          setShowRoleChangePopup(true);
                        } else {
                          handleCustomer();
                        }
                      }}
                      className="cursor-pointer h-[40px] w-full flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500"
                    >
                      Customer
                    </button>
                    <button
                      onClick={() => {
                        if (fetchUserRole === "Farmer") {
                          setShowRoleChangePopup(true);
                        } else {
                          handleFarmer();
                        }
                      }}
                      className="cursor-pointer h-[40px] w-full flex justify-center items-center rounded-md border-2 border-gray-400 hover:bg-blue-100 hover:border-blue-500"
                    >
                      Farmer
                    </button>
                  </div>
                </ul>
              </div>
            )}
          </div>
          {/* Role already selected pop up */}
          {showRoleChangePopup && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
              <div className="w-[300px] h-[150px] bg-green-200 rounded-lg p-2 flex justify-center items-center relative">
                <div className="w-full h-full relative flex flex-col justify-center items-center">
                  <h3 className="gap-1 flex text-[18px]">
                    You are already a
                    <span className="font-bold">{fetchUserRole}</span>
                  </h3>
                  <p className="text-[14px] font-semibold">
                    Select another role.
                  </p>
                  <button
                    onClick={() => setShowRoleChangePopup(false)}
                    className="absolute top-0 right-0 z-40"
                  >
                    <ImCross className="text-red-600 text-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Customer pop up */}
          {showConfirmationPopupCustomer && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
              <div className="w-[320px] h-[180px] bg-green-200 rounded-lg p-2 flex justify-center items-center relative">
                <div className="w-full h-full relative flex flex-col justify-center items-center">
                  <h3 className="gap-1 flex text-[18px]">Are you sure ?</h3>
                  <p className="text-[14px]">
                    You want to be a
                    <span className="text-red-600 font-bold text-[16px] ml-1">
                      Customer.
                    </span>
                  </p>
                  <p className="text-[14px] font-semibold text-red-600">
                    Your store name and products will be deleted.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRole("Customer");
                      handleRoleChange("Customer");
                      setShowConfirmationPopupCustomer(false);
                    }}
                    className="absolute bottom-0 left-4 border-2 border-gray-500 rounded-md w-[50px] z-40"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirmationPopupCustomer(false)}
                    className="absolute bottom-0 right-4 border-2 border-gray-500 rounded-md w-[50px] z-40"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Farmer pop up */}
          {showConfirmationPopupFarmer && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
              <div className="w-[300px] h-[150px] bg-green-200 rounded-lg p-2 flex justify-center items-center relative">
                <div className="w-full h-full relative flex flex-col justify-center items-center">
                  <h3 className="gap-1 flex text-[18px]">Are you sure ?</h3>
                  <p className="text-[14px]">
                    You want to be a
                    <span className="text-red-600 font-bold text-[16px] ml-1">
                      Farmer.
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      setShowStoreNamePopup(true);
                      setShowConfirmationPopupFarmer(false);
                    }}
                    className="absolute bottom-0 left-4 border-2 border-gray-500 rounded-md w-[50px] z-40"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirmationPopupFarmer(false)}
                    className="absolute bottom-0 right-4 border-2 border-gray-500 rounded-md w-[50px] z-40"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* enter store name pop up */}
          {showStoreNamePopup && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex justify-center items-center z-40">
              <div className="w-[300px] h-[180px] bg-green-200 rounded-lg p-2 flex justify-center items-center relative">
                <div className="w-full h-full relative flex flex-col justify-center items-center">
                  <h3 className="text-[18px] font-bold">Enter Store Name:</h3>
                  <input
                    type="text"
                    value={newStoreName}
                    onChange={(e) => setNewStoreName(e.target.value)}
                    className="mt-2 px-2 py-1 border border-gray-400 rounded-md"
                  />
                  <div className="mt-4 font-semibold">
                    <button
                      onClick={() => {
                        setSelectedRole("Farmer");
                        handleRoleChange("Farmer");
                        handleNewStoreName();
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowStoreNamePopup(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Change Store Name */}
        {fetchUserRole === "Farmer" && (
          <div className="bg-blue-200 h-auto flex gap-4 items-center mt-2">
            <h1 className="text-[18px] font-bold">Change Store Name :</h1>
            <button
              onClick={() => setShowStoreNamePopup(true)}
              className="bg-[#069E2D] hover:bg-[#04773B] text-[18px] text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[200px] h-[50px] cursor-pointer flex justify-center items-center gap-4"
            >
              Change Store Name
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
