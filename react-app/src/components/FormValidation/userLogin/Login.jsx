import { Formik } from "formik";
import TextField from "../userSignUp/TextField";
import firstImg from "../../../assets/firstImg.png";
import { getUserByEmailPassword } from "../../DatabaseOperation/DatabaseOperation";
import { useNavigate } from "react-router-dom";
//
import { useContext } from "react";
import { UserContext } from "../GoogleAuth/UserGoogleAuthentication";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Destructure setUser to update user state

  const handleFormSubmit = async (values) => {
    console.log("Logging in with:", values);
    try {
      const userExists = await getUserByEmailPassword(
        values.email,
        values.password
      );
      console.log("User exists:", userExists);
      if (userExists) {
        setUser({
          email: values.email,
          password: values.password,
        });
        console.log("Login successful !!. Please wait...");
        navigate("/");
      } else {
        console.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit }) => (
        <div className="bg-[#c5c4c4] h-screen w-screen flex justify-center items-center absolute z-30">
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
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
