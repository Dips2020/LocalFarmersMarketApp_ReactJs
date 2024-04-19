/* eslint-disable no-unused-vars */
import React from "react";
import { Formik } from "formik";
import TextField from "../userSignUp/TextField";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../GoogleAuth/UserGoogleAuthentication";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    handleFormSubmit,
    googleSignIn,
    user,
    invalidEmailMsg,
    invalidPasswordMsg,
  } = useContext(UserContext); // Destructure setUser to update user state
  const [isGoogleLoginSuccess, setIsGoogleLoginSuccess] = useState(false);

  const navigate = useNavigate(); // Import useNavigate

  // handle google sign in
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setIsGoogleLoginSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log("isGoogleLoginSuccess changed:", isGoogleLoginSuccess);
    if (user) {
      const timeoutId = setTimeout(() => {
        setIsGoogleLoginSuccess(
          <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-[12px] font-bold py-[4px] text-center">
            Logged in with Google successfully.
            {console.log("Google sign-in successful.")}
            {console.log("Navigating to homepage after 5 seconds...")}
          </div>
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [navigate, user]);

  const handleManualLogin = async (values) => {
    try {
      const success = await handleFormSubmit(values);
      if (success) {
        navigate("/");
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleManualLogin}
    >
      {({ handleSubmit }) => (
        <div className="bg-black bg-opacity-[70%] h-screen w-screen flex justify-center items-center absolute z-50">
          <div className="flex w-[1200px] h-[550px] justify-center items-center shadow-md">
            <div className="h-[550px] w-[50%]">
              <video
                // src="https://videos.pexels.com/video-files/7031954/7031954-uhd_3840_2160_24fps.mp4"
                src="https://videos.pexels.com/video-files/2806063/2806063-hd_1080_1920_30fps.mp4"
                className="object-cover w-full h-full rounded-r"
                autoPlay
                muted
                loop
              ></video>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white h-[550px] w-[50%] flex flex-col justify-center items-center rounded-r-lg relative"
            >
              <div className="h-[50px] w-full text-center">
                <h1 className="font-bold text-2xl text-black">
                  Welcome to Login Page !!
                </h1>
              </div>
              <div className="h-[85%] w-full flex flex-col justify-center items-center space-y-6">
                <div className="h-[300px] w-[95%] flex flex-col justify-center items-center relative border-b-2 border-gray-300">
                  <div className="h-[50%] w-full flex justify-center items-center relative">
                    <div>
                      <TextField name="email" label="Email" />
                      {invalidEmailMsg ? (
                        <div className="absolute bottom-5 left-[40px] font-semibold text-[16px] text-red-500">
                          Invalid Email !
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                      />
                    </div>
                    {invalidPasswordMsg ? (
                      <div className="absolute bottom-5 right-[40px] font-semibold text-[16px] text-red-500">
                        Invalid Password !
                      </div>
                    ) : null}
                  </div>
                  <div className="h-[30%] w-full flex justify-center items-center space-x-6">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[220px] h-[50px]"
                    >
                      Login
                    </button>
                    <h1 className="font-bold text-[18px]">OR</h1>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-[10px] rounded-lg transition duration-300 w-[220px] h-[50px] flex justify-evenly items-center"
                    >
                      <span className="text-2xl bg-white rounded-sm">
                        <FcGoogle />
                      </span>
                      Continue with Google
                    </button>
                  </div>
                </div>
                <div className="h-[20%] w-full flex justify-center items-center space-x-2">
                  <h2> Account not registered? </h2>
                  <Link to="/signUp">
                    <button className="hover:cursor text-blue-700 font-bold">
                      Create New
                    </button>
                  </Link>
                </div>
              </div>
              {/* //* Displaying google sign in success message */}
              {isGoogleLoginSuccess}
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
