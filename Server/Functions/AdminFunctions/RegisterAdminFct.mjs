import { Admin } from "../../DB_Schema/adminSchema.mjs";
const registerAdmin = (req, res) => {
  const { firstName, lastName, phoneNumber, dateOfBirth, username, password } =
    req.body;

  const newAdmin = new Admin({
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    username,
    password,
  });
  newAdmin
    .save()
    .then(console.log("Admin Saved"))
    .catch((err) => {
      console.log(err);
    });
};
export default registerAdmin;
