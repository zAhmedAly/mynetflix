import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./user.css";

export default function User() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useParams();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/users/find/${userId}`);
        setUser(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        console.log(err);
      }
    };
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="user">
      {isLoading ? (
        <p> Loading ... </p>
      ) : (
        <>
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={
                    user?.profilePic
                      ? user.profilePic
                      : "../../img/noAvatar.jpg"
                  }
                  alt="profilePic"
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {user.fname + " " + user.lname}
                  </span>
                  <span className="userShowUserTitle">{user.job}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.username}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.birthDate}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.phone}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user?.city ? user.city : "No City"} | {user.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder={user.username}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder={user.fname + " " + user.lname}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder={user.email}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder={user.phone}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder={`${user?.city ? user.city : "No City"} | ${
                        user.country
                      }`}
                      className="userUpdateInput"
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src={
                        user?.profilePic
                          ? user.profilePic
                          : "../../img/noAvatar.jpg"
                      }
                      alt="profilePic"
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                  <button className="userUpdateButton">Update</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
