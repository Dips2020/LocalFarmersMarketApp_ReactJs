/* eslint-disable no-unused-vars */
import React from "react";
import { createContext } from "react";
import { useEffect, useState } from "react"; // useEffect and useState for checking user authenticated or not
import {
  GoogleAuthProvider,
  signInWithPopup,
  // signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../config/DatabaseConnection";
import PropTypes from "prop-types";
import {
  insertGoogleAuthData,
  getUserByEmailPassword,
  getUserByEmail,
} from "../../DatabaseOperation/DatabaseOperation";

const UserContext = createContext();
const UserGoogleAuthentication = ({ children }) => {
  //* login in with pop up or redirect ------------------------
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider); //! -----> sign in with a pop it works fine for windows
    // signInWithRedirect(auth, provider); //! -----> sign in with a redirect
  };

  const [invalidEmailMsg, setInvalidEmailMsg] = useState(false);
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState(false);
  //* running only once when the components mounts --> useState and useEffect for checking user authenticated or not ------------------------
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("Current user: ", currentUser);
        // If user is newly authenticated (not just user object exists), insert their displayName and email into Realtime Database
        if (currentUser.uid && currentUser.email && currentUser.displayName) {
          insertGoogleAuthData(
            currentUser.uid,
            currentUser.email,
            currentUser.displayName,
            null,
            null
          );
        }
      } else {
        setUser(null); // Clear user data if not authenticated
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //* logout part ------------------------
  const logOut = async () => {
    await signOut(auth).then(() => setUser(null));
    localStorage.removeItem("user");
  };

  //* Login.jsx part ------------------- manual Login
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
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: values.email,
            password: values.password,
          })
        );
        console.log("Login successful !!. Please wait...");
        return true; // Return true if login is successful
      } else {
        // Check if user exists with the provided email
        const userWithEmailExists = await getUserByEmail(values.email);
        if (userWithEmailExists) {
          console.error("Invalid password !");
          setInvalidPasswordMsg(true);
        } else {
          console.error("Invalid email");
          setInvalidEmailMsg(true);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    return false; // Return false if login fails
  };

  return (
    <UserContext.Provider
      value={{
        googleSignIn,
        user,
        logOut,
        setUser,
        handleFormSubmit,
        invalidEmailMsg,
        invalidPasswordMsg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// props validation for children
UserGoogleAuthentication.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserGoogleAuthentication;
export { UserContext };
