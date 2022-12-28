import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const { isFetching, dispatch, error } = useContext(AuthContext);

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

  const handleRegister = () => {
    history.push("/register");
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="img/movieflix.png" alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
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
            Sign In
          </button>
          <span style={{ marginTop: "32px" }}>
            New to Netflix?{" "}
            <b style={{ cursor: "pointer" }} onClick={handleRegister}>
              Sign up now.
            </b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b style={{ color: "#0071eb" }}>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
