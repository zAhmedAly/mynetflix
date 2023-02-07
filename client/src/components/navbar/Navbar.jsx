import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movies",
  },
  {
    display: "TV Series",
    path: "/series",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch, user } = useContext(AuthContext);

  const { pathname } = useLocation();

  const active = headerNav.findIndex((e) => e.path === pathname);

  const history = useHistory();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset <= 30 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogot = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/login");
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img
              src="../../img/mflogo512.png"
              alt="mflogo"
              className="smLogo"
            />
            {/* </Link>
          <Link to="/" className="link"> */}
            <img
              src="../../img/movieflix.png"
              alt="movieflix"
              className="lgLogo"
            />
          </Link>

          {headerNav.map((e, i) => (
            <span key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </span>
          ))}

          {/* {headerNav.map((e, i) => (
            <Link to={e.path}>
              <span
                key={i}
                className={` navbarmainLinks ${i === active ? "active" : ""}`}
              >
                {" "}
                {e.display}
              </span>
            </Link>
          ))} */}

          {/* <Link to="/series" className="link">
            <span className="navbarmainLinks">TV Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span className="navbarmainLinks">New|Popular</span> */}
          {/* <span className="navbarmainLinks">My List</span> */}
        </div>

        {/*                */}

        <div className="right">
          <Search className="icon" />
          <Notifications className="icon" />
          <span>{user.username}</span>
          {/* <img src="img/profileImg.webp" alt="" /> */}
          <img
            // src={user?.profilePic ? user.profilePic : "../../img/noAvatar.jpg"}
            src="../../img/noAvatar.jpg"
            alt="profilePic"
          />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={handleLogot}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
