import { useState, useEffect } from "react";
import { imgDB } from "../../config/DatabaseConnection";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const UserProduct = () => {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const handleUpload = () => {
    if (img !== null) {
      const imgRef = ref(imgDB, `ProductsImg/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log("Value: ", value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  useEffect(() => {
    const fetchImageURLs = async () => {
      try {
        const result = await listAll(ref(imgDB, "ProductsImg"));
        const urls = await Promise.all(
          result.items.map(async (val) => await getDownloadURL(val))
        );
        setImgUrl(urls);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };
    fetchImageURLs();
  }, []);

  return (
    <div className="mt-[92px] w-[1200px] bg-blue-200 h-auto">
      {/* img upload */}
      <div className="flex flex-col w-full h-auto bg-red-200">
        <div className="flex w-full h-auto bg-blue-200 justify-evenly items-center flex-wrap">
          {imgUrl.map((imgUrl, index) => (
            <div
              key={index}
              className="flex flex-col justify-evenly items-center h-[500px] bg-purple-300 w-[384px] rounded-lg m-2"
            >
              <img
                src={imgUrl}
                className="object-contain h-[400px] w-[300px] rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
              <div className="flex flex-col justify-center items-center text-center w-[90%] h-[100px] bg-red-300">
                <h1 className="font-bold text-2xl">Title</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  rem?
                </p>
              </div>
            </div>
          ))}
          {/* ------------------------- */}
          <div className="flex flex-col space-y-2 justify-evenly items-center w-[384px] h-[500px] rounded-lg bg-orange-200 m-2">
            <label
              htmlFor="file-upload"
              className="bg-gray-200 w-[300px] h-[300px] flex justify-center items-center cursor-pointer rounded-lg"
            >
              <span className="text-black font-bold">Upload Product Image</span>
              <input
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
            </label>
            <button
              onClick={handleUpload}
              className="bg-[#81C408] hover:bg-[#58ae34] text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[200px] h-[50px]"
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
