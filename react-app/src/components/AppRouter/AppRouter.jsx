// /* eslint-disable no-unused-vars */
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignUp from "../FormValidation/userSignUp/SignUp";
// import Login from "../FormValidation/userLogin/Login";
// import HomePage from "../HomePage/HomePage";
// import Contact from "../HomePage/pages/Contact";
// import PageNotFound from "../HomePage/pages/PageNotFound";
// // import UserGoogleAuthentication from "../FormValidation/GoogleAuth/UserGoogleAuthentication";
// import BlogPage from "../HomePage/pages/BlogPage";
// import Profile from "../HomePage/userProfile/Profile";
// import NavBar from "../HomePage/Navbar/NavBar";
// import UserProduct from "../HomePage/ProductPage/UserProduct";
// import Footer from "../HomePage/pages/Footer";
// import Dashboard from "../HomePage/pages/Dashboard";
// import Admin from "../HomePage/pages/Admin";
// import AddToCart from "../HomePage/pages/AddToCart/AddToCart";

// const AppRouter = () => {
//   return (
//     <Router>
//       <section className="w-full h-auto bg-[#036016] flex flex-col justify-center items-center">
//         <div className="w-[1200px] relative flex flex-col items-center">
//           {/* <UserGoogleAuthentication> */}
//           {/* Navbar --------------------- */}
//           <NavBar />
//         </div>
//         <div className="w-[1200px] relative flex flex-col items-center">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="addToCart" element={<AddToCart />} />
//             <Route path="userProfile" element={<Profile />} />
//             <Route path="admin-only-developers" element={<Admin />} />
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="yourProduct" element={<UserProduct />} />
//             <Route path="contact" element={<Contact />} />
//             <Route path="blog" element={<BlogPage />} />
//             <Route path="signUp" element={<SignUp />} />
//             <Route path="login" element={<Login />} />
//             <Route path="*" element={<PageNotFound />} />
//           </Routes>
//         </div>
//         {/* footer -------------------- */}
//         <Footer />
//         {/* </UserGoogleAuthentication> */}
//       </section>
//     </Router>
//   );
// };
// export default AppRouter;
