import { set, database, ref, get } from "../config/DatabaseConnection"; // Importing necessary Firebase functions

//? ------------------------ inserting-part
export const insertUserData = (data) => {
  console.log("Inserting new user details to DB.");
  set(ref(database, "users/" + Date.now()), data)
    .then(() => {
      console.log("Successfully inserted to DB.");
    })
    .catch((error) => {
      console.log("Error occurred:", error);
    });
};

//? ------------------------ checking-email-for-create-account
// *** Function to check if a user exists in the database with the same email
export const getUserByEmail = async (email) => {
  try {
    // Reference to the 'users' node in your Firebase database
    const usersRef = ref(database, "users");

    // Query to find a user with the specified email
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userWithEmail = Object.values(userData).find(
        (user) => user.email === email
      );
      return userWithEmail !== undefined;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false; // Return false in case of error
  }
};

//? ------------------------ checking-email-password-for-login
// ***
export const getUserByEmailPassword = async (email, password) => {
  try {
    console.log("Checking user existence with email:", email);
    // Reference to the 'users' node in your Firebase database
    const usersRef = ref(database, "users");

    // Query to find a user with the specified email
    const snapshot = await get(usersRef);
    console.log("Snapshot:", snapshot.val()); // Log the snapshot data
    if (snapshot.exists()) {
      const userData = snapshot.val();
      // Find user by email
      const userWithEmail = Object.values(userData).find(
        (user) => user.email === email
      );

      // Check if user with email exists and password matches
      if (userWithEmail && userWithEmail.password === password) {
        console.log("User found:", userWithEmail);
        return true;
      } else {
        console.log("User email found or invalid password");
        return false;
      }
    } else {
      console.log("No users found in database");
      return false;
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false; // Return false in case of error
  }
};
