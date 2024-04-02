import { Formik } from "formik";
import TextField from "../userSignUp/TextField";
import firstImg from "../../../assets/firstImg.png";
import { useContext } from "react";
import { UserContext } from "../GoogleAuth/UserGoogleAuthentication";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleFormSubmit } = useContext(UserContext); // Destructure setUser to update user state
  const navigate = useNavigate(); // Import useNavigate

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
        <div className="bg-[#c5c4c4] h-screen w-screen flex justify-center items-center absolute z-50">
          <div className="flex w-[80%] h-[550px] justify-center items-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]">
            <div className="h-[550px] w-[550px]">
              <img
                src={firstImg}
                alt="First img"
                className="object-cover w-full h-full rounded-l-lg"
              />
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white h-[550px] w-[550px] flex flex-col justify-center items-center space-y-5 rounded-r-lg"
            >
              <div>
                <h1 className="font-bold text-2xl text-black">
                  Welcome to Login Page !!
                </h1>
              </div>
              <div className="h-[300px] w-full flex flex-col justify-center items-center space-y-6">
                <div>
                  <TextField name="email" label="Email" />
                </div>
                <div>
                  <TextField name="password" label="Password" type="password" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-[200px] h-[50px]"
              >
                Login
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-[10px]  rounded-lg transition duration-300 w-[200px] h-[50px] flex justify-between items-center"
              >
                <span className="text-2xl bg-white rounded-sm">
                  <FcGoogle />
                </span>
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
