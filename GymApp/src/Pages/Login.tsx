import axios from "axios";
import { useState } from "react";
import { useSecurityContext } from "../Context/SecurityContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const Navigate = useNavigate();
  const { setAccessToken } = useSecurityContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const LoginPerson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    const accessToken = res.data.AccessToken;
    setAccessToken(accessToken);
    if (res.data.AccessToken) Navigate("/");
  };
  return (
    <>
      <form action="" onSubmit={LoginPerson}>
        <div>
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
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
