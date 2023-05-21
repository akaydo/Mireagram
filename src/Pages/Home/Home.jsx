import React from "react";
import Leftbar from "../../Components/LeftSideContainer/Leftbar";
import MainPost from "../../Components/MainPostContainer/MainPost";
import Navbar from "../../Components/Navbar/Navbar";
import Rightbar from "../../Components/RightSideContainer/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="сontainer">
        <Leftbar />
        <MainPost />
        <Rightbar />
      </div>
    </div>
  );
}
