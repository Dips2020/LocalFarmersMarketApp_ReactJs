//
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);
  return (
    <div className="flex flex-col h-screen justify-center items-center w-screen">
      <div className="flex flex-col bg-blue-200 h-[300px] justify-center items-center w-[650px]">
        <Link to="/pageNotFound">
          <h1 className="text-red-500 font-bold text-3xl text-center">
            Oops!!, Page not found.
          </h1>
          <br />
          <h2 className="text-red-500 font-bold text-2xl text-center">
            You will be redirecting to Homepage after 3 seconds...
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
