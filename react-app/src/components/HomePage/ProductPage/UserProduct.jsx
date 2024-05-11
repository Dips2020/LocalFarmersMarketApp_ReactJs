import { useState, useEffect } from "react";
import {
  imgDB,
  database,
  get,
  ref,
  remove,
} from "../../config/DatabaseConnection";
import { v4 } from "uuid";
import {
  getDownloadURL,
  uploadBytes,
  ref as dbRef, // to prevent ref conflict between image fetching and img name fetching
} from "firebase/storage";
import { MdDelete } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { insertUserProduct } from "../../DatabaseOperation/DatabaseOperation";
import { useContext } from "react";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";
import { TbCategoryFilled } from "react-icons/tb";

const UserProduct = () => {
  const [img, setImg] = useState("");
  const [productNames, setProductNames] = useState([]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useContext(UserContext);

  const handleUpload = () => {
    if (img !== null) {
      const uuid = v4(); // Generate a UUID
      const imgRef = dbRef(imgDB, `ProductsImg/${uuid}`);
      uploadBytes(imgRef, img).then((snapshot) => {
        console.log("Uploaded a blob or file!", snapshot);
        // Get the download URL for the image
        getDownloadURL(snapshot.ref).then((url) => {
          setImgUrl((prevUrls) => {
            const productName = productNames[prevUrls.length];
            const updatedUrls = [...prevUrls, { url, uuid }];
            // Set default values for price and category if not provided
            const productPrice = price[prevUrls.length] || "";
            const productCategory = category[prevUrls.length] || "";
            console.log("Uploaded image with UUID:", uuid);
            // Insert product data into the Realtime Database along with the image URL
            if (user.uid) {
              insertUserProduct(
                user.uid,
                url,
                productName,
                productPrice,
                productCategory
              );
            } else {
              console.error("User UID is undefined.");
            }
            return updatedUrls;
          });
        });
      });
    }
  };

  //* ====================================================================================================
  //TODO: deleting in storage
  //* ====================================================================================================
  const handleDelete = async (index) => {
    try {
      // Ensure the user is authenticated
      if (!user || !user.uid) {
        console.error("User UID is undefined.");
        return;
      }

      // Get the product name and URL to delete
      const productName = productNames[index];

      // Remove the product data from the Realtime Database
      await remove(ref(database, `ProductDetails/${user.uid}/${productName}`));

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = ref(database, `ProductDetails/${user.uid}`);
        const snapshot = await get(productRef);
        const productDetails = snapshot.val();

        if (productDetails) {
          const names = Object.values(productDetails).map(
            (product) => product.product_Name
          );
          const prices = Object.values(productDetails).map(
            (product) => product.product_Price
          );
          const categories = Object.values(productDetails).map(
            (product) => product.product_Category
          );

          setProductNames(names);
          setPrice(prices);
          setCategory(categories);

          const urls = Object.values(productDetails).map((product) => ({
            uuid: product.uuid,
            url: product.product_Url,
          }));

          setImgUrl(urls);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [user.uid]);

  return (
    <div className="mt-[100px] w-[1200px] h-auto bg-[#c5c1c1] rounded-t-md">
      {/* img upload */}
      <div className="flex flex-col w-full h-auto">
        <div className="flex w-full h-auto justify-between items-center flex-wrap gap-3">
          {imgUrl.map((item, index) => (
            <div
              key={index}
              className="flex flex-col flex-wrap w-[280px] h-auto justify-center gap-4 items-center bg-[#e0dcdc] rounded-lg p-4 relative"
            >
              <img
                src={item.url}
                className="object-contain h-[200px] w-[200px] rounded-lg mb-2 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
              <div
                className="absolute text-2xl top-1 right-2 hover:cursor-pointer"
                onClick={toggleDropdown}
              >
                <SlOptions />
                {showDropdown && (
                  <div className="absolute top-0 right-[40px] bg-white p-2 rounded-lg shadow-md">
                    <MdDelete onClick={() => handleDelete(index)} />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start justify-start h-auto w-full gap-2">
                <h1 className="font-bold text-2xl">{productNames[index]}</h1>
                <p className="text-[14px] flex justify-center items-center gap-2">
                  Price:
                  <span className="text-red-500 text-[18px]">
                    ${price[index]}
                  </span>
                </p>
                <h2 className="text-[20px] flex justify-center items-center h-[30px] gap-2">
                  <TbCategoryFilled />
                  <span className="text-[12px]">{category[index]} </span>
                </h2>
              </div>
            </div>
          ))}
          {/* ------------------------- */}
          <div className="flex flex-col space-y-2 justify-evenly items-center w-[280px] h-auto rounded-lg bg-[#d1a6a6] pt-2 pb-2 mb-2">
            <label
              htmlFor="file-upload"
              className="bg-gray-200 h-[200px] w-[200px] flex justify-center items-center cursor-pointer rounded-lg"
            >
              <span className="text-black font-semibold text-[14px]">
                Upload Product Image
              </span>
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              value={productNames[imgUrl.length] || ""}
              onChange={(e) => {
                const updatedNames = [...productNames];
                updatedNames[imgUrl.length] = e.target.value;
                setProductNames(updatedNames);
              }}
              className="w-[200px] h-[30px] text-[12px] bg-white p-2 rounded-md outline-none border-2 border-white hover:border-[#069E2D]"
            />
            <div className="w-[200px] h-[30px] flex justify-between items-center">
              <label className="font-semibold text-[14px]">Price:</label>
              <input
                type="text"
                placeholder="Enter Price $"
                value={price[imgUrl.length] || ""}
                onChange={(e) => {
                  const updatePrice = [...price];
                  updatePrice[imgUrl.length] = e.target.value;
                  setPrice(updatePrice);
                }}
                className="w-[70%] h-[30px] text-[12px] bg-white p-2 rounded-md outline-none border-2 border-white hover:border-[#069E2D]"
              />
            </div>
            <div className="w-[200px] h-[30px] flex justify-between items-center">
              <span className="text-[16px]">
                <TbCategoryFilled />
              </span>
              <input
                type="text"
                placeholder="Category"
                value={category[imgUrl.length] || ""}
                onChange={(e) => {
                  const updateCategory = [...category];
                  updateCategory[imgUrl.length] = e.target.value;
                  setCategory(updateCategory);
                }}
                className="w-[70%] h-[30px] text-[12px] bg-white p-2 rounded-md outline-none border-2 border-white hover:border-[#069E2D]"
              />
            </div>

            <button
              onClick={handleUpload}
              className="flex justify-center items-center w-[200px] h-[40px] bg-[#069E2D] hover:bg-[#58ae34] text-[14px] text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProduct;
