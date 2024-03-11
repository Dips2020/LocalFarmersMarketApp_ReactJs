import { database, ref, set } from "../config/DatabaseConnection";

// inserting-part
export const insertUserData = (data) => {
  console.log("Inserting to DB.");
  set(ref(database, "users/" + Date.now()), data)
    .then(() => {
      console.log("Success.");
    })
    .catch((error) => {
      console.log("Error occurred:", error);
    });
};
