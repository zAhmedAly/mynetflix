// import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { register } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";

import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState(null);

  const history = useHistory();
  // const axiosInstance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  // });

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
    border: "2px solid white",
  };
  const { isFetching, dispatch, error, user } = useContext(AuthContext);

  useEffect(() => {
    let timer;
    if (error) {
      setMsg(error);
      timer = setTimeout(() => {
        setMsg(null);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [error]);

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    if (!email || !username || !password) {
      setMsg("Email, Username & Password are required");
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } else {
      register({ email, username, password }, dispatch);
      user && history.push("/login");
    }

    // try {
    //   await axiosInstance.post("auth/register", { email, username, password });
    //   history.push("/login");
    // } catch (err) {}
  };

  const handleSignIn = () => {
    history.push("/login");
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="../../img/movieflix.png" alt="" />
          <button type="button" className="loginButton" onClick={handleSignIn}>
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <div className="wrapper">
          <h1>Unlimited Movies, TV shows & more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? <b>Enter your email</b> to create or restart your
            membership.
          </p>
          {!email ? (
            <div className="input1">
              <input type="email" placeholder="Email address" ref={emailRef} />
              <button
                type="button"
                className="registerButton"
                onClick={handleStart}
              >
                Get Started
              </button>
            </div>
          ) : (
            <form className="input2">
              <input type="username" placeholder="username" ref={usernameRef} />
              <input type="password" placeholder="password" ref={passwordRef} />
              <button
                type="button"
                className="registerButton"
                onClick={handleFinish}
              >
                {!isFetching ? (
                  "Start"
                ) : (
                  <ClipLoader
                    // color={color}
                    loading={isFetching}
                    cssOverride={override}
                    size={35}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </button>
            </form>
          )}
          <p
            style={{
              color: "red",
              height: "20px",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "1rem",
              backgroundColor: "black",
            }}
          >
            {" "}
            {!isFetching && msg}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
