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

const UserContext = createContext();

const UserGoogleAuthentication = ({ children }) => {
  //* login in with pop up or redirect ------------------------
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider); //! -----> sign in with a pop it works fine for windows
    // signInWithRedirect(auth, provider); //! -----> sign in with a redirect
  };

  //* running only once when the components mounts --> useState and useEffect for checking user authenticated or not ------------------------
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("Current user: ", currentUser);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //* logout part ------------------------
  const logOut = () => {
    // signOut(auth);
    signOut(auth).then(() => setUser(null)); // Reset user state to null on logout
  };

  return (
    <UserContext.Provider value={{ googleSignIn, user, logOut, setUser }}>
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
