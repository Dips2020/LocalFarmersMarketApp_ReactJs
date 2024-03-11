import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "../FormValidation/userSignUp/SignUp";
import Login from "../FormValidation/userLogin/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
