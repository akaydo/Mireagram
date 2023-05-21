import React from "react";
import "./navbar.css";
import searchIcon from "../Images/search.png";
import Notifications from "../Images/bell.png";
import Message from "../Images/message.png";
import Logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxContainer/userReducer";

export default function Navbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  let id = user?.other?._id;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="main-navbar">
      <Link to={"/"}>
        <div className="logo-container">
          <img src={`${Logo}`} className="logo-image" />
        </div>
      </Link>
      <div>
        <div className="search-input-container">
          <img src={`${searchIcon}`} className="search-icon" alt="" />
          <input
            type="text"
            className="search-input"
            placeholder="Найти друзей"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="icons-container">
        <img src={`${Notifications}`} className="icons" alt="" />
        <Link to={"/chat"}>
          <img src={`${Message}`} className="icons" alt="" />
        </Link>

        <Link to={`/Profile/${id}`}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={`${user?.other?.profile}`}
              className="profile-image"
              alt=""
            />
            <p style={{ marginLeft: "5px" }}>{user?.other?.username}</p>
          </div>
        </Link>
        <div
          style={{ marginRight: "30px", marginLeft: "20px", cursor: "pointer" }}
          onClick={handleLogout}
        >
          <p>Выйти</p>
        </div>
      </div>
    </div>
  );
}
