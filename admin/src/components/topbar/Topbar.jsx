import React, { useContext, useRef } from "react";
import "./topbar.css";
import {
  ArrowDropDown,
  NotificationsNone,
  Language,
  Settings,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";

import { logout } from "../../context/authContext/AuthActions";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);

  const history = useHistory();

  const profileRef = useRef();

  const handleLogot = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <Link to="/" className="link">
          <div className="topLeft">
            <img className="mflogo" src="../../img/mflogo.png" alt="mflogo" />
            <span className="logoTitle">Admin | Panel</span>
          </div>
        </Link>

        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone style={{ fontSize: "1.875rem" }} />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language style={{ fontSize: "1.875rem" }} />
            {/* <span className="topIconBadge">2</span> */}
          </div>
          <div className="topbarIconContainer">
            <Settings style={{ fontSize: "1.875rem" }} />
          </div>
          <div className="topbarIconContainer">
            {/* <img src="../../img/profileImg.webp" alt="" className="topAvatar" /> */}
            <img
              src={
                user?.profilePic ? user.profilePic : "../../img/noAvatar.jpg"
              }
              alt="profilePic"
              className="topAvatar"
            />
          </div>
          <div className="profile" ref={profileRef}>
            <ArrowDropDown className="icon" style={{ fontSize: "1.875rem" }} />
            <div className="options">
              <span className="option">Settings</span>
              <span className="option" onClick={handleLogot}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
