import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import ProfileLeftbar from "../../Components/ProfileLeftSideСontainer/ProfileLeftbar";
import ProfileMainPost from "../../Components/ProfileMainPostContainer/ProfileMainPost";
import ProfileRightbar from "../../Components/ProfileRightSideContainer/ProfileRightbar";
import "./profile.css";

export default function Profile() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  console.log(user);
  return (
    <div className="profile-container">
      <Navbar />
      <div className="subprofile-container">
        <ProfileLeftbar />
        <ProfileMainPost />
        <ProfileRightbar />
      </div>
    </div>
  );
}
