//
import { useState, useEffect } from "react";
import { database, ref, get } from "../../config/DatabaseConnection";
import { useContext } from "react";
import { UserContext } from "../../FormValidation/GoogleAuth/UserGoogleAuthentication";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [fetchUserName, setFetchUserName] = useState("");
  const [fetchUserEmail, setFetchUserEmail] = useState("");
  const [fetchUserRole, setFetchUserRole] = useState("");

  useEffect(() => {
    const fetchUserNameFromDatabase = async () => {
      if (user && user.uid) {
        try {
          // Fetch display name
          const displayNameRef = ref(database, `users/${user.uid}/displayName`);
          const displayNameSnapshot = await get(displayNameRef);
          const displayName = displayNameSnapshot.val();
          if (displayName) {
            setFetchUserName(displayName);
          }

          // Fetch email
          const emailRef = ref(database, `users/${user.uid}/email`);
          const emailSnapshot = await get(emailRef);
          const email = emailSnapshot.val();
          if (email) {
            setFetchUserEmail(email);
          }

          // Fetch role
          const roleRef = ref(database, `users/${user.uid}/role`);
          const roleSnapshot = await get(roleRef);
          const role = roleSnapshot.val();
          if (role) {
            setFetchUserRole(role);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserNameFromDatabase();
  }, [user]);

  return (
    <div className="h-[500px] w-full bg-red-200 mt-[100px] rounded-lg mb-2 flex">
      <div className="w-[30%] h-full flex flex-col rounded-l-lg bg-gradient-to-r from-[#536976] to-[#BBD2C5]">
        <h1>{fetchUserName}</h1>
        <h1>{fetchUserEmail}</h1>
        <h1>{fetchUserRole}</h1>
      </div>
      <div className="w-[70%] h-full flex flex-col bg-blue-100 rounded-r-lg bg-gradient-to-r from-[#536976] to-[#BBD2C5]"></div>
    </div>
  );
};

export default Profile;
