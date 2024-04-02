import { Formik } from "formik";
import userLoginSchemas from "../validation_schemas/userSignInSchemas";
import TextField from "./TextField";
import { FcGoogle } from "react-icons/fc";
import firstImg from "../../../assets/firstImg.png";
import { insertUserData } from "../../DatabaseOperation/DatabaseOperation";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react"; // using this useContext hook for google authentication
import { UserContext } from "../GoogleAuth/UserGoogleAuthentication";
import { getUserByEmail } from "../../DatabaseOperation/DatabaseOperation";

const SignUp = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGoogleLoginSuccess, setIsGoogleLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      // **** Check if the user already exists with the same email name -----------------------
      const userExists = await getUserByEmail(values.email);
      if (userExists) {
        console.error(
          "User with this email address already exists.\nPlease try with different email address."
        );
        return;
      }

      insertUserData(values); // Call function to insert data into database
      setIsSuccess(true); // Set isSuccess state to true after successful -- create account
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 5000);
      resetForm(); // Reset form fields after submission
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  // handle google sign in
  const { googleSignIn, user } = useContext(UserContext);
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

  return (
    <div className="bg-[#c5c4c4] w-screen h-screen flex flex-col justify-center items-center z-50 absolute">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={userLoginSchemas}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit }) => (
          <div className="flex w-[80%] justify-center items-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]">
            <form
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              className="bg-white h-[550px] w-[550px] flex flex-col justify-center items-center space-y-5 rounded-l relative"
            >
              {isSuccess && (
                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-[12px] font-bold py-[4px] text-center">
                  Account created successfully. Please wait...
                </div>
              )}

              {/* //* Displaying google sign in success message */}
              {isGoogleLoginSuccess}

              <div>
                <h1 className="w-full font-bold text-2xl text-black">
                  Sign Up !!
                </h1>
              </div>
              <div className="h-[400px] w-full flex justify-center items-center ">
                {/* form */}
                <div className="h-full w-[55%] flex flex-col justify-center items-center space-y-[1px] border-r-2 border-red-500 border-b-2">
                  <div>
                    <TextField name="firstName" label="First name" />
                  </div>
                  <div>
                    <TextField name="lastName" label="Last name" />
                  </div>
                  <div>
                    <TextField name="email" label="Email" />
                  </div>
                  <div>
                    <TextField
                      name="password"
                      type="password"
                      label="Password"
                    />
                  </div>
                </div>
                {/* buttons */}
                <div className="w-[45%] flex flex-col space-y-4 h-full justify-center items-center border-t-2 border-red-500">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[200px] h-[50px]"
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-[10px]  rounded-lg transition duration-300 w-[200px] h-[50px] flex justify-between items-center"
                  >
                    <span className="text-2xl bg-white rounded-sm">
                      <FcGoogle />
                    </span>
                    Sign up with Google
                  </button>
                  <span className="text-blue-700 pt-10">
                    Already have an account?
                  </span>
                  <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[200px] h-[50px]">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </form>
            <div className="h-[550px] w-[550px]">
              <img
                src={firstImg}
                alt="First img"
                className="object-cover w-full h-full rounded-r"
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
