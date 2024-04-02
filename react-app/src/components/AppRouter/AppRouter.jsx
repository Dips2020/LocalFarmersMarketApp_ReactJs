import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "../FormValidation/userSignUp/SignUp";
import Login from "../FormValidation/userLogin/Login";
import HomePage from "../HomePage/HomePage";
import Contact from "../HomePage/pages/Contact";
import PageNotFound from "../HomePage/pages/PageNotFound";
import UserGoogleAuthentication from "../FormValidation/GoogleAuth/UserGoogleAuthentication";
import BlogPage from "../HomePage/pages/BlogPage";
import Profile from "../HomePage/userProfile/Profile";
import NavBar from "../HomePage/Navbar/NavBar";
import UserProduct from "../HomePage/ProductPage/UserProduct";
import Footer from "../HomePage/pages/Footer";

const AppRouter = () => {
  return (
    <Router>
      <UserGoogleAuthentication>
        <section className="w-full h-auto bg-orange-200 flex flex-col justify-center items-center">
          <div className="w-[1200px] relative flex flex-col items-center">
            {/* Navbar --------------------- */}
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/userProfile" element={<Profile />}></Route>
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/yourProduct" element={<UserProduct />}></Route>
            </Routes>
          </div>
          {/* footer -------------------- */}
          <Footer />
        </section>
      </UserGoogleAuthentication>
    </Router>
  );
};

export default AppRouter;
