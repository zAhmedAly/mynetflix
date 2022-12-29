import { useContext, useEffect, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const { isFetching, dispatch, error } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg("Email & Password are required");
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } else {
      login({ email, password }, dispatch);
    }
  };

  useEffect(() => {
    if (error) {
      setMsg(error);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }

    return () => {
      setMsg(null);
    };
  }, [error]);

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="img/movieflix.png" alt="" />
        </div>
      </div>
      <div className="formContainer">
        <form className="loginForm">
          <h1>Admin Login</h1>
          <input
            type="text"
            placeholder="Email address"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p
            style={{
              color: "red",
              height: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {" "}
            {msg}{" "}
          </p>

          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
