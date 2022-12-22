import React, { useContext, useRef } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";

import { logout } from "../../context/authContext/AuthActions";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);

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
        <div className="topLeft">
          <img className="mflogo" src="../../img/mflogo.png" alt="mflogo" />
          <span className="logoTitle">Admin | Panel</span>
        </div>
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
          <img src="../../img/profileImg.webp" alt="" className="topAvatar" />
          <div className="profile" ref={profileRef}>
            {/* <ArrowDropDown className="icon" /> */}
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
