import { object, string } from "yup";
const validationSchema = object({
  firstName: string()
    .required("Enter your name.")
    .min(3, "Minimum character is 3.")
    .max(20, "Max character is 20."),
  lastName: string()
    .required("Enter your last name.")
    .min(3, "You need to write at least 3 characters.")
    .max(20, "Max character is 20 only."),
  email: string()
    .required("Enter your email address.")
    .email("Enter a valid email address."),
  password: string()
    .required("Enter your password.")
    .min(5, "Minimum is 5 characters.")
    .max(30, "Maximum character is 30."),
});
export default validationSchema;
