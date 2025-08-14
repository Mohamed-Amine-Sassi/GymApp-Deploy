import { useState } from "react";
import axios from "axios";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const registerPerson = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !username ||
      !password ||
      !phoneNumber
    ) {
      return alert("Sth is missing!");
    } else if (password.length < 8) {
      return alert("Password must be 8+ carracters");
    }
    const GymCode = prompt(
      "Not everyone can be an admin only those with the GymPassword:"
    );
    if (GymCode != import.meta.env.VITE_GymCode) {
      return alert("Wrong GymCode! you can't be an admin");
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        username,
        password,
      })
      .then(() => {
        console.log("registered");
      })
      .catch((err) => {
        console.log("Sth went wrong:", err);
      });
  };

  return (
    <>
      <form onSubmit={registerPerson}>
        <div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              onChange={(e) => {
                setDateOfBirth(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Username:</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit">Register</button>
        </div>
      </form>
    </>
  );
}
export default Register;
