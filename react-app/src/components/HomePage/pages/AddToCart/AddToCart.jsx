/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { TbCategoryFilled } from "react-icons/tb";
import {
  ref,
  onValue,
  database,
  remove,
} from "../../../config/DatabaseConnection";
import { UserContext } from "../../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdCart } from "react-icons/io";

const AddToCart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // const fetchCartItems = async () => {
    //   try {
    //     // Reference to the user's cart in the database
    //     const cartRef = ref(database, `AddToCart/${user.uid}`);

    //     // Listen for changes to the user's cart
    //     onValue(cartRef, (snapshot) => {
    //       const cartData = snapshot.val() || {};
    //       const items = Object.values(cartData);
    //       setCartItems(items);
    //     });
    //   } catch (error) {
    //     console.error("Error fetching cart items:", error);
    //   }
    // };
    const fetchCartItems = async () => {
      try {
        const cartRef = ref(database, `AddToCart/${user.uid}`);
        onValue(cartRef, (snapshot) => {
          const cartData = snapshot.val() || {};
          const items = Object.values(cartData).map((item) => ({
            ...item,
            count: 1, // Initialize count for each item
          }));
          setCartItems(items);
        });
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user.uid]);

  //* ========================== Handle delete from AddToCart page
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteProductName, setDeleteProductName] = useState("");

  const handleDelete = (product_Name) => {
    setDeleteProductId(product_Name);
    setDeleteProductName(product_Name);
  };

  const confirmDelete = () => {
    try {
      const productRef = ref(
        database,
        `AddToCart/${user.uid}/${deleteProductId}`
      );
      remove(productRef);
      // After successfully removing the product, update the cart items state
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.product_Name !== deleteProductId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleteProductId(null);
      setDeleteProductName("");
    }
  };
  const cancelDelete = () => {
    setDeleteProductId(null);
    setDeleteProductName("");
  };

  // const [count, setCount] = useState(1);
  const handleCountChange = (index, increment) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item, i) => {
        if (i === index) {
          const newCount = Math.max(item.count + (increment ? 1 : -1), 1);
          return { ...item, count: newCount };
        }
        return item;
      })
    );
  };

  return (
    <div className="h-auto w-full bg-[#c5c1c1] mt-[100px] rounded-lg mb-2 flex flex-col items-center">
      <div className="flex justify-center items-center w-full h-[50px] bg-[#e0dcdc] rounded-t-lg mb-2">
        <h2 className="text-2xl font-bold border-gray-400 border-b-2 rounded-2xl pr-4 pl-4 pb-1 flex justify-center items-center gap-2">
          Your Cart
          <span>
            <IoMdCart className="h-[30px] w-[30px]" />
          </span>
        </h2>
      </div>
      <div className="flex justify-between w-full items-center gap-2">
        <div className="flex gap-3 flex-wrap justify-between w-[70%] h-auto">
          {cartItems.length > 0 ? (
            // If there are items in the cart, render them
            cartItems.map((item, index) => (
              <div
                key={index}
                className="w-[411px] flex items-center justify-between bg-white p-2 rounded-lg shadow-md h-[150px]"
              >
                <img
                  src={item.product_Url}
                  alt={item.product_Name}
                  className="h-[120px] w-[180px] mr-2 object-cover rounded-md"
                />
                <div className="w-[120px] h-[120px] flex flex-col justify-center items-start gap-2">
                  <h1 className="text-[20px] font-semibold">
                    {item.product_Name}
                  </h1>
                  <p className="text-gray-600 text-[12px] flex items-center gap-1">
                    <span className="text-black">
                      <TbCategoryFilled />
                    </span>
                    {item.product_Category}
                  </p>
                  <p className="text-red-500 font-semibold">
                    ${item.product_Price}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-around w-[80px] h-full">
                  <div className="flex items-center justify-around rounded-sm w-[80px] pt-1 pb-1 h-[25px] shadow-md">
                    <button
                      onClick={() => handleCountChange(index, false)}
                      className="bg-white w-[20px] h-[20px] flex items-center justify-center text-[14px] rounded-sm cursor-pointer font-bold border-r-[1px]"
                    >
                      -
                    </button>
                    <span className="bg-white w-[30px] h-[20px] flex items-center font-bold text-[14px] justify-center rounded-sm">
                      {item.count}
                    </span>
                    <button
                      onClick={() => handleCountChange(index, true)}
                      className="bg-white w-[20px] h-[20px] flex items-center justify-center text-[14px] rounded-sm cursor-pointer font-bold border-l-[1px]"
                    >
                      +
                    </button>
                  </div>
                  <MdDelete
                    onClick={() => handleDelete(item.product_Name)}
                    className="h-[30px] w-[30px] cursor-pointer text-red-600 shadow-md rounded-md"
                  />
                </div>
              </div>
            ))
          ) : (
            // If cart is empty, display a message\
            <div className="flex justify-center items-center w-full p-4 h-[200px]">
              <p className="text-black font-semibold text-[20px] flex justify-center items-center gap-2">
                Your cart
                <span>
                  <IoMdCart className="h-[30px] w-[30px]" />
                </span>
                is empty.
              </p>
            </div>
          )}
        </div>
        <div className="w-[30%] bg-[#aaa9a9] h-[480px] flex justify-center items-center rounded-lg">
          <h1 className="flex justify-center items-center gap-2 font-bold text-[20px]">
            Total Items: <span className="text-[25px]">{cartItems.length}</span>
          </h1>
        </div>
      </div>
      {deleteProductId && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center">
            <p className="text-lg flex flex-col justify-center items-center gap-2">
              Are you sure, you want to remove this item?
              <span className="text-2xl font-bold text-red-600">
                {deleteProductName}
              </span>
              <span className="text-[18px] font-semibold flex justify-center items-center gap-2">
                From your <IoMdCart /> cart
              </span>
            </p>
            <div className="mt-2 flex justify-between items-center w-full">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded mr-4"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
